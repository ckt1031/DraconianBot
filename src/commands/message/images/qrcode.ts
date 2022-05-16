import { MessageEmbed } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'qrcode',
    description: 'Generate QR Code by one click.',
    directMessageAllowed: true,
    cooldownInterval: 5 * 1000,
  },
  run: async ({ message, args }) => {
    const embed = new MessageEmbed();

    const data = args.join(' ');

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data.replace(
      /\s/g,
      '%20',
    )}`;

    embed.setImage(url);

    message.channel.send({
      embeds: [embed],
    });
  },
};
