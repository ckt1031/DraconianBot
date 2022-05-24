import { cooldownCache } from '../../utils/cache';
import { parseMsToVisibleText } from '../../utils/formatters';

import type { CommandInteraction } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

import { ownerId } from '../../../config/bot.json';

export const event: DiscordEvent = {
  name: 'interactionCreate',
  run: async (client, interaction: CommandInteraction) => {
    if (interaction.guild && !interaction.member) {
      await interaction.guild.members.fetch(interaction.user.id);
    }

    const returnOfInter = (content: string, ephemeral = true) => {
      interaction.reply({ content, ephemeral });
    };

    if (interaction.isCommand()) {
      const { commandName, user } = interaction;

      const slashCollection = client.slashcommands;

      const slash = slashCollection.get(commandName);

      if (!slashCollection.has(commandName) || !slash) {
        return returnOfInter('Error Occured!');
      }

      // Eligibility Validations
      if (slash?.enabled === false) {
        return returnOfInter('This command is not enabled to execute.');
      }

      if (slash?.data?.ownerOnly === true && user.id !== ownerId) {
        return returnOfInter('This command is not enabled to execute.');
      }

      if (
        slash?.data?.developmentOnly === true &&
        process.env.NODE_ENV !== 'development'
      ) {
        return returnOfInter(
          'This command is not enabled to execute in current state.',
        );
      }

      // Cooldown Validation
      const now = Date.now();
      const keyName = `CMD_${user.id}_${slash.slashData.name}`;
      const cooldownInterval = slash?.data?.cooldownInterval ?? 3000;

      // Reject if user exists in cooldown.
      if (cooldownCache.has(keyName)) {
        const expectedEnd = cooldownCache.get(keyName);
        if (expectedEnd && now < Number(expectedEnd)) {
          const timeleft = parseMsToVisibleText(Number(expectedEnd) - now);
          return returnOfInter(
            `Before using this command, please wait for **${timeleft}**.`,
          );
        }
      }

      // Set cooldown
      cooldownCache.set(
        keyName,
        now + cooldownInterval,
        cooldownInterval * 1000,
      );

      try {
        return slash.run({ interaction });
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    }
  },
};
