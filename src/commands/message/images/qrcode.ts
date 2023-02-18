import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';
import { callbackEmbed } from '../../../utils/messages';

export const command: TextCommand = {
  data: {
    name: 'qrcode',
    description: 'Generate QR Code by one click.',
    directMessageAllowed: true,
    cooldownInterval: 5 * 1000,
  },
  run: async ({ message, args }) => {
    if (message.channel.isVoiceBased()) return;

    const embed = new EmbedBuilder();

    const data = args.join(' ');

    if (!data) {
      const cEmbed = callbackEmbed({
        text: 'Missing QR Code data!',
        color: 'Red',
        mode: 'error',
      });
      await message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data.replace(
      /\s/g,
      '%20',
    )}`;

    embed.setImage(url);

    await message.channel.send({
      embeds: [embed],
    });
  },
};
