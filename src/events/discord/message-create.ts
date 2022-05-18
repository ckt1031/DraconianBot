import { callbackEmbed } from '../../utils/messages';
import { parseMsToVisibleText } from '../../utils/formatters';
import { guildConfiguration, ensureServerData } from '../../utils/database';
import { getCommandHelpInfo, resembleCommandCheck } from '../../utils/cmds';

import type { Message, TextChannel, PermissionResolvable } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';
import type { TextCommand } from '../../sturctures/command';
import type { GuildConfig } from '../../sturctures/database';

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
          cmdName = cmd?.data.name!;
          break;
        } else if (aliasesMatching) {
          cmd = client.commands.get(aliasesMatching);
          cmdName = cmd?.data.name!;
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

      const cmdData = cmd!.data;

      /**
       * Command's eligibility vaildation.
       */

      // Reject if no.
      if (!cmd) return;

      if (cmd.enabled === false) return;

      // Reject if not in development mode
      if (
        cmdData?.developmentOnly === true &&
        process.env.NODE_ENV !== 'development'
      ) {
        return;
      }

      if (cmdData?.ownerOnly === true && author.id !== ownerId) return;

      // Reject if command can only be executed NSFW channel when it's not in.
      if (
        cmdData?.nsfwChannelRequired &&
        (!guild || !channel.isText()) &&
        !(channel as TextChannel).nsfw
      ) {
        const cEmbed = callbackEmbed({
          text: `You must be in **NSFW** channel before executing this commmand.`,
          color: 'RED',
          mode: 'error',
        });
        message.reply({
          embeds: [cEmbed],
        });
        return;
      }

      // Reject if dm mode while configurated to guild only.
      if (!guild && !cmdData?.directMessageAllowed) return;

      // Reject when Target disabled or didn't reach the requirement.
      if (guild) {
        const commandDatasbase = guildDatabase?.commands!;
        // GUILD specifies disabled command.
        if (commandDatasbase.global.disabled.includes(cmdName)) {
          return;
        }

        // Specified CATAGORIES
        if (
          commandDatasbase.global.disabledCatagories.includes(
            cmd.data.catagory!,
          )
        ) {
          return;
        }

        // Specified CHANNEL
        if (
          commandDatasbase.channelDisabled
            .find(x => x.id === channel.id)
            ?.cmds.includes(cmdName)
        ) {
          return;
        }

        // Specified ROLE
        if (member?.roles.cache) {
          // eslint-disable-next-line no-unsafe-optional-chaining
          for (const role of member?.roles.cache) {
            const hasRole = commandDatasbase.roleDisabled
              .find(x => x.id === role[1].id)
              ?.cmds.includes(cmdName);
            if (hasRole) return;
          }
        }

        // Specified USER
        if (
          commandDatasbase.userDisabled
            .find(x => x.id === author.id)
            ?.cmds.includes(cmdName)
        ) {
          return;
        }

        if (
          cmd.data?.inVoiceChannelRequired === true &&
          !member?.voice.channel
        ) {
          const cEmbed = callbackEmbed({
            text: `You must be in voice channel before executing this commmand.`,
            color: 'RED',
            mode: 'error',
          });
          message.reply({
            embeds: [cEmbed],
          });
          return;
        }
      }

      /**
       * END of Command's eligibility vaildation.
       */

      // Cooldown Validation
      const now = Date.now();
      const keyName = `CMD_${author.id}_${cmdName}`;

      const cooldowns = client.cooldown;
      const cooldownInterval = cmd.data.cooldownInterval ?? 3000;

      // Reject if user exists in cooldown.
      if (cooldowns.has(keyName)) {
        const expectedEnd = cooldowns.get(keyName);
        if (expectedEnd && now < expectedEnd) {
          const timeleft = parseMsToVisibleText(Number(expectedEnd) - now);
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
        const permMissing: PermissionResolvable[] = [];
        for (const perm of requestPermsClient) {
          const botId = client.user?.id;
          if (botId) {
            const isOwned = guild.members.cache
              .get(botId)
              ?.permissions.has(perm);
            if (!isOwned) permMissing.push(perm);
          }
        }

        // Reject if BOT doesn't own permission(s).
        if (permMissing.length > 0) {
          const perms = permMissing.map(index => `\`${index}\``).join(', ');
          message.reply({
            content: `I don't have permission: \`${perms}\``,
          });
          return;
        }
      }

      // Permission Check (AUTHOR)
      const requestPermsAuthor = cmd.data.authorRequiredPermissions;
      if (guild && requestPermsAuthor) {
        const permMissing: PermissionResolvable[] = [];
        for (const perm of requestPermsAuthor) {
          const isOwned = member?.permissions.has(perm);
          if (!isOwned) permMissing.push(perm);
        }

        // Reject if AUTHOR doesn't own permission(s).
        if (permMissing.length > 0) {
          const perms = permMissing.map(index => `\`${index}\``).join(', ');
          message.reply({
            content: `Missing Permission: \`${perms}\``,
          });
          return;
        }
      }

      // Pass args
      const arguments_ = parsedContent.split(' ').slice(1);

      if (arguments_[0] === 'help') {
        const helpInfo = getCommandHelpInfo(cmd);
        message.reply({
          embeds: [helpInfo],
        });
        return;
      }

      try {
        return cmd.run({ message, args: arguments_ });
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    }
  },
};
