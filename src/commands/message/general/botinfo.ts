import pidusage from 'pidusage';
import { MessageEmbed, version as discordJsVersion } from 'discord.js';

import { parseMsToVisibleText } from '../../../utils/formatters';

import { version as packageVersion } from '../../../../package.json';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'botinfo',
    description: 'Check Bot information.',
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const apiDelayMS = Math.round(message.client.ws.ping);
    const statsOS = await pidusage(process.pid);

    const embed = new MessageEmbed()
      .setTitle("Bot's Information")
      .setDescription(
        'Hello! I am Draconian Bot, honored to see you here. Information below is my body analysis :)',
      )
      .addFields({
        name: 'Version',
        value: `\`${packageVersion}\``,
        inline: true,
      })
      .addFields({
        name: 'Discord.js',
        value: `\`${discordJsVersion}\``,
        inline: true,
      })
      .addFields({
        name: 'Node',
        value: `\`${process.version}\``,
        inline: true,
      })
      .addFields({
        name: 'CPU',
        value: `\`${Math.round(Number(statsOS.cpu.toFixed(2)))}%\``,
        inline: true,
      })
      .addFields({
        name: 'Memory',
        value: `\`${Math.round(statsOS.memory / (1024 * 1024))}MB\``,
        inline: true,
      })
      .addFields({
        name: 'Uptime',
        value: `\`${parseMsToVisibleText(message.client.uptime ?? 0)}\``,
        inline: true,
      })
      .addFields({
        name: 'Network Delay',
        value: `\`${apiDelayMS} ms\``,
        inline: true,
      });

    message.reply({
      embeds: [embed],
    });
  },
};
