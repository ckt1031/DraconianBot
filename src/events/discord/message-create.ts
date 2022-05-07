import { callbackEmbed } from '../../utils/messages';
import { getCommandHelpInfo } from '../../utils/cmds';
import { parseMsToVisibleText } from '../../utils/formatters';
import { guildConfiguration, ensureServerData } from '../../utils/database';

import type { Message } from 'discord.js';
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

    const mentionReg = new RegExp(`^(<@!?${client.user?.id}>)`);
    const mentionTest = mentionReg.test(content);
    if (mentionTest) {
      channel.send('Hey! My prefix is `d!`');
      return;
    }

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

    const prefixReg = new RegExp(`^${prefix}`);
    const prefixTest = content.match(prefixReg);
    if (prefixTest) {
      const [prefix] = prefixTest;
      const parsedContent = content.slice(prefix.length);
      if (!parsedContent) return;

      const command = parsedContent.split(' ')[0];
      // Command Content Parsing.
      let cmd: TextCommand | undefined;
      const commandMatching = client.commands.get(command);
      const aliasesMatching = client.aliases.get(command);
      // Fetch command destination.
      if (commandMatching) {
        cmd = commandMatching;
      } else if (aliasesMatching) {
        cmd = client.commands.get(aliasesMatching);
      } else {
        return;
      }
      // callback if no.
      if (!cmd) return;

      if (cmd.data?.ownerOnly === true && author.id !== ownerId) return;

      if (!cmd.data?.directMessageAllowed && !guild) return;

      if (cmd.enabled === false) return;

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

      // Permission Check
      const requestPerms = cmd.data.requiredPermissions;
      if (guild && requestPerms) {
        const permissionMissing = [];
        for (const perm of requestPerms) {
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
        cmd.run({ message, args: arguments_ });
      } catch (error) {
        if (error instanceof Error) console.error(error); // eslint-disable-line no-console
      }
    }
  },
};
