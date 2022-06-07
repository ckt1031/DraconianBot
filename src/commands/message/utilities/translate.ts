import translate from '@vitalets/google-translate-api';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'translate',
    description: 'Translate any text.',
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message, args }) => {
    const embed = new EmbedBuilder();

    const toLanguage = args[0];

    const originWord = args.slice(1).join(' ');

    if (!toLanguage || !originWord) {
      return;
    }

    try {
      const result = await translate(originWord, { to: toLanguage });

      embed.setTitle('Result:').setDescription(result.text);

      message.reply({
        embeds: [embed],
      });
    } catch (error) {
      if (error instanceof Error) {
        embed
          .setTitle(error.message)
          .setDescription(
            '[Supported Languages](https://raw.githubusercontent.com/RealKoolisw/DraconianBot/main/assets/public/translationlist.js)',
          );

        message.reply({
          embeds: [embed],
        });
      }
    }
  },
};
