import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder } from 'discord.js';

import type { SlashCommand } from '../../sturctures/command';
import { command as TextCommand } from '../message/general/ping';

export const command: SlashCommand = {
  slashData: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(TextCommand.data.description),
  run: async ({ interaction }) => {
    const apiDelayMS = Math.round(interaction.client.ws.ping);
    const messageDelayMS = Date.now() - interaction.createdTimestamp;

    const embed = new EmbedBuilder().setDescription(
      `Action Delay: \`${messageDelayMS}ms\`\nAPI Delay: \`${apiDelayMS}ms\``,
    );

    interaction.reply({
      embeds: [embed],
    });
  },
};
