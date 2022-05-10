import { parseMsToVisibleText } from '../../utils/formatters';

import type { CommandInteraction } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

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

      // Cooldown Check
      const now = Date.now();
      const keyName = `CMD_${user.id}_${slash.data.name}`;
      const cooldowns = client.cooldown;
      const cooldownInterval = slash.config?.cooldownInterval ?? 3000;

      // Callback if exists in cooldown.
      if (cooldowns.has(keyName)) {
        const expectedEnd = cooldowns.get(keyName);
        if (expectedEnd && now < expectedEnd) {
          const timeleft = parseMsToVisibleText(expectedEnd - now);
          return returnOfInter(
            `Before using this command, please wait for **${timeleft}**.`,
          );
        }
      }

      // Set cooldown
      cooldowns.set(keyName, now + cooldownInterval);
      setTimeout(() => cooldowns.delete(keyName), cooldownInterval);

      try {
        return slash.run({ interaction });
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    }
  },
};
