import { EmbedBuilder, version as discordJsVersion } from 'discord.js';
import pidusage from 'pidusage';

import { version as packageVersion } from '../../../../package.json';
import type { TextCommand } from '../../../sturctures/command';
import { parseMsToVisibleText } from '../../../utils/formatters';

export const command: TextCommand = {
  data: {
    name: 'botinfo',
    description: 'Check Bot information.',
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const apiDelayMS = Math.round(message.client.ws.ping);
    const osStats = await pidusage(process.pid);

    const embed = new EmbedBuilder()
      .setTitle("Bot's Information")
      .setDescription(
        'Hello! I am Draconian Bot, honored to see you here. Information below is my body analysis :)',
      )
      .addFields([
        {
          name: 'Version',
          value: `\`${packageVersion}\``,
          inline: true,
        },
        {
          name: 'Discord.js',
          value: `\`${discordJsVersion}\``,
          inline: true,
        },
        {
          name: 'Node',
          value: `\`${process.version}\``,
          inline: true,
        },
        {
          name: 'CPU',
          value: `\`${Math.round(Number(osStats.cpu.toFixed(2)))}%\``,
          inline: true,
        },
        {
          name: 'Memory',
          value: `\`${Math.round(osStats.memory / (1024 * 1024))}MB\``,
          inline: true,
        },
        {
          name: 'Uptime',
          value: `\`${parseMsToVisibleText(message.client.uptime)}\``,
          inline: true,
        },
        {
          name: 'Network Delay',
          value: `\`${apiDelayMS} ms\``,
          inline: true,
        },
      ]);

    await message.reply({
      embeds: [embed],
    });
  },
};
