import { parseMsToVisibleText } from '../../utils/formatters';

import type { Message } from 'discord.js';
import type { Event } from '../../sturctures/event';
import type { TextCommand } from '../../sturctures/command';

export const event: Event = {
  name: 'messageCreate',
  run: async (client, message: Message) => {
    const { content, channel, author, webhookId, partial, member, guild } =
      message;

    if (author.bot) return;
    if (webhookId || author.id === client.user?.id) return;
    if (partial) await message.fetch();

    if (guild) {
      // Fetch Member
      if (!member) await guild.members.fetch(author.id);
    }

    const mentionReg = new RegExp(`^(<@!?${client.user?.id}>)`);
    const mentionTest = mentionReg.test(content);
    if (mentionTest) {
      channel.send('Hey! My prefix is `d!`');
      return;
    }

    const prefixReg = new RegExp('^d!|D!');
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

      if (commandMatching) {
        cmd = commandMatching;
      } else if (aliasesMatching) {
        cmd = client.commands.get(aliasesMatching);
      } else {
        return;
      }

      if (!cmd) return;

      // Cooldown Check
      const now = Date.now();
      const keyName = `CMD_${author.id}_${cmd.data.name}`;

      const cooldowns = client.cooldown;
      const cooldownInterval = cmd.data.cooldownInterval ?? 3000;
      if (cooldowns.has(keyName)) {
        const expectedEnd = cooldowns.get(keyName);
        if (now < expectedEnd) {
          const tL = parseMsToVisibleText(expectedEnd - now);
          const postMessage = await message.reply({
            content: `Before using this command, please wait for **${tL}**.`,
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
