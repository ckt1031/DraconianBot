import { callbackEmbed } from '../../utils/messages';
import { getCommandHelpInfo, resembleCommandCheck } from '../../utils/cmds';
import { parseMsToVisibleText } from '../../utils/formatters';
import { guildConfiguration, ensureServerData } from '../../utils/database';

import type { Message, TextChannel } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';
import type { TextCommand } from '../../sturctures/command';
import type { GuildConfig } from '../../utils/database';

import { ownerId } from '../../../config/bot.json';

export const event: DiscordEvent = {
  name: 'messageCreate',
  run: async (client, message: Message) => {
    if (message.partial) await message.fetch();

    const { content, channel, author, webhookId, member, guild } = message;

    if (author.bot) return;
    if (webhookId || author.id === client.user?.id) return;

    let prefix = 'd!';

    let guildDatabase: GuildConfig | undefined;

    if (guild) {
      if (!guildConfiguration.has(guild.id)) {
        ensureServerData(guild.id);
      }

      guildDatabase = guildConfiguration.get(guild.id);

      if (guildDatabase) prefix = guildDatabase.prefix;

      // Fetch Member
      if (!member) await guild.members.fetch(author.id);
    }

    const mentionReg = new RegExp(`^(<@!?${client.user?.id}>)`);
    const mentionTest = mentionReg.test(content);
    if (mentionTest) {
      channel.send(`Hey! My prefix is \`${prefix}\``);
      return;
    }

    const prefixReg = new RegExp(`^${prefix}`);
    const prefixTest = content.match(prefixReg);
    if (prefixTest) {
      const [prefix] = prefixTest;
      const parsedContent = content.slice(prefix.length);
      if (!parsedContent) return;

      const command = parsedContent.split(' ')[0];

      // Command Content Parsing.
      let cmd: TextCommand | undefined;

      let cmdName = command;

      // Fetch command destination.
      for (let index = 0; index < 2; index++) {
        const commandMatching = client.commands.get(cmdName);
        const aliasesMatching = client.aliases.get(cmdName);

        if (commandMatching) {
          cmd = commandMatching;
          break;
        } else if (aliasesMatching) {
          cmd = client.commands.get(aliasesMatching);
          break;
        } else {
          if (index === 0) {
            const expectedCommandName = await resembleCommandCheck(
              message,
              cmdName,
            );
            if (expectedCommandName) {
              cmdName = expectedCommandName.name;
              message.createdTimestamp += expectedCommandName.timeTaken;
              continue;
            }
          }
          return;
        }
      }

      // callback if no.
      if (!cmd) return;

      if (cmd.enabled === false) return;

      // If not in development mode
      if (
        cmd.data?.developmentOnly === true &&
        process.env.NODE_ENV !== 'development'
      ) {
        return;
      }

      if (cmd.data?.ownerOnly === true && author.id !== ownerId) return;

      // Return if command can only be executed NSFW channel when it's not in.
      if (cmd.data?.nsfwChannelRequired) {
        if (!guild || !channel.isText()) return;
        if (!(channel as TextChannel).nsfw) {
          return callbackEmbed({
            message,
            text: `You must be in **NSFW** channel before executing this commmand.`,
            color: 'RED',
            mode: 'error',
          });
        }
      }

      // Return if dm mode while configurated to guildOnly.
      if (!cmd.data?.directMessageAllowed && !guild) return;

      // Intermit when disabled.
      if (
        guild &&
        guildDatabase?.commands.global.disabled.includes(cmd.data.name)
      ) {
        return;
      }

      if (cmd.data?.inVoiceChannelRequired === true && !member?.voice.channel) {
        return callbackEmbed({
          message,
          text: `You must be in voice channel before executing this commmand.`,
          color: 'RED',
          mode: 'error',
        });
      }

      // Cooldown Check
      const now = Date.now();
      const keyName = `CMD_${author.id}_${cmd.data.name}`;

      const cooldowns = client.cooldown;
      const cooldownInterval = cmd.data.cooldownInterval ?? 3000;
      if (cooldowns.has(keyName)) {
        const expectedEnd = cooldowns.get(keyName);
        if (expectedEnd && now < expectedEnd) {
          const timeleft = parseMsToVisibleText(expectedEnd - now);
          const postMessage = await message.reply({
            content: `Before using this command, please wait for **${timeleft}**.`,
            allowedMentions: { repliedUser: true },
          });
          setTimeout(() => {
            if (postMessage.deletable) postMessage.delete();
          }, 6000);
          return;
        }
      }

      // Set cooldown.
      cooldowns.set(keyName, now + cooldownInterval);
      setTimeout(() => cooldowns.delete(keyName), cooldownInterval);

      // Permission Check (BOT)
      const requestPermsClient = cmd.data.clientRequiredPermissions;
      if (guild && requestPermsClient) {
        const permissionMissing = [];
        for (const perm of requestPermsClient) {
          const botId = client.user?.id;
          if (botId) {
            const isOwned = guild.members.cache
              .get(botId)
              ?.permissions.has(perm);
            if (!isOwned) permissionMissing.push(perm);
          }
        }

        if (permissionMissing.length > 0) {
          const perms = permissionMissing
            .map(index => `\`${index}\``)
            .join(', ');
          message.reply({
            content: `I don't have permission: \`${perms}\``,
          });
          return;
        }
      }

      // Permission Check (AUTHOR)
      const requestPermsAuthor = cmd.data.authorRequiredPermissions;
      if (guild && requestPermsAuthor) {
        const permissionMissing = [];
        for (const perm of requestPermsAuthor) {
          const isOwned = member?.permissions.has(perm);
          if (!isOwned) permissionMissing.push(perm);
        }

        if (permissionMissing.length > 0) {
          const perms = permissionMissing
            .map(index => `\`${index}\``)
            .join(', ');
          message.reply({
            content: `Missing Permission: \`${perms}\``,
          });
          return;
        }
      }

      // Pass args
      const arguments_ = parsedContent.split(' ').slice(1);

      if (arguments_[0] === 'help') {
        return getCommandHelpInfo(message, cmd);
      }

      try {
        return cmd.run({ message, args: arguments_ });
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    }
  },
};
