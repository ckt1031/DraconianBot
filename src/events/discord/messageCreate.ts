import { guildConfiguration, ensureServerData } from '../../utils/database';
import { parseMsToVisibleText } from '../../utils/formatters';

import type { Message } from 'discord.js';
import type { Event } from '../../sturctures/event';
import type { TextCommand } from '../../sturctures/command';

export const event: Event = {
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

    if (guild) {
      if (!guildConfiguration.has(guild.id)) {
        ensureServerData(guild.id);
      }

      const guildDatabase = guildConfiguration.get(guild.id);

      if (guildDatabase) {
        prefix = guildDatabase.prefix;
      }

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

      if (!cmd.data.directMessageAllowed) {
        if (!guild) return;
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
      cooldowns.set(keyName, now + cooldownInterval);
      setTimeout(() => cooldowns.delete(keyName), cooldownInterval);

      // Permission Check
      const reqPerms = cmd.data.requiredPermissions;
      if (guild && reqPerms) {
        let missingPermissionIndex = -1;
        for (const perm of reqPerms) {
          const isOwned = member?.permissions.has(perm);
          if (!isOwned) missingPermissionIndex = reqPerms.indexOf(perm);
        }

        if (missingPermissionIndex > -1) {
          message.reply({
            content: `Missing Permission: \`${reqPerms[missingPermissionIndex]}\``,
          });
          return;
        }
      }

      // Pass args
      const args = parsedContent.split(' ').slice(1);

      try {
        cmd.run({ message, args });
      } catch (error) {
        if (error instanceof Error) console.error(error); // eslint-disable-line no-console
      }
    }
  },
};
