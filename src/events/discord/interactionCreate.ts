import { parseMsToVisibleText } from '../../utils/formatters';

import type { CommandInteraction } from 'discord.js';
import type { Event } from '../../sturctures/event';

export const event: Event = {
  name: 'interactionCreate',
  run: async (client, interaction: CommandInteraction) => {
    if (interaction.guild && !interaction.member) {
      await interaction.guild.members.fetch(interaction.user.id);
    }

    const returnOfInter = (content: string, ephemeral = true) => {
      interaction.reply({ content, ephemeral });
    };

    if (interaction.isCommand()) {
      const { commandName, options, user } = interaction;

      const slashCollection = client.slashcommands;

      const slash = slashCollection.get(commandName);

      if (!slashCollection.has(commandName) || !slash) {
        return returnOfInter('Error Occured!');
      }

      // Cooldown Check
      const now = Date.now();
      const keyName = `CMD_${user.id}_${slash.data.name}`;
      const cooldowns = client.cooldown;
      const cooldownInterval = slash.data.cooldownInterval ?? 3000;
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

      cooldowns.set(keyName, now + cooldownInterval);
      setTimeout(() => cooldowns.delete(keyName), cooldownInterval);

      const args: any[] = [];

      for (let index = 0, l = options.data.length; index < l; index++) {
        const data = options.data[index];
        if (data.type === 'SUB_COMMAND') {
          if (data.name) {
            args.push(data.name);
          }
          if (data.options) {
            for (const options of data.options) {
              if (options.value) args.push(options.value);
            }
          }
        } else if (data.value) args.push(data.value);
      }

      try {
        return slash.run({ interaction, args });
      } catch (error) {
        if (error instanceof Error) console.error(error);
      }
    }
  },
};
