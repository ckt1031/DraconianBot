import dayjs from 'dayjs';
import type { GuildMember } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'serverinfo',
    description: "Check server's stats and information.",
    directMessageAllowed: false,
  },
  run: async ({ message }) => {
    const { guild } = message;

    if (!guild) return;

    const owner = await guild.fetchOwner();

    const embed = new EmbedBuilder()
      .setThumbnail(guild.iconURL()!)
      .setTitle(`${guild.name}'s information:`)
      .addFields([
        { name: 'Owner', value: owner.user.tag, inline: true },

        {
          name: 'Created on',
          value: dayjs(guild.createdAt.getTime()).format('DD/MM/YYYY'),
          inline: true,
        },

        {
          name: 'User Count',
          value: guild.memberCount.toString(),
          inline: true,
        },

        {
          name: 'Bot Count',
          value: guild.members.cache
            .filter((m: GuildMember) => m.user.bot)
            .size.toString(),
          inline: true,
        },
        {
          name: 'Roles',
          value: guild.members.cache
            .filter((m: GuildMember) => m.user.bot)
            .size.toString(),
          inline: true,
        },
        {
          name: 'Roles',
          value: guild.roles.cache.size.toString(),
          inline: true,
        },
        {
          name: 'Emojis',
          value: guild.channels.cache.size.toString(),
          inline: true,
        },
        {
          name: 'Verification Level',
          value: guild.verificationLevel.toString(),
          inline: true,
        },
      ])
      .setFooter({
        text: `Shard ID: ${guild.shardId}`,
      });

    if (guild.description) embed.setDescription(guild.description);

    if (guild.premiumSubscriptionCount) {
      embed.addFields([
        {
          name: 'Total Boosts',
          value: guild.premiumSubscriptionCount.toString(),
          inline: true,
        },
      ]);
    }

    if (guild.vanityURLCode) {
      const url = `https://discord.gg/${guild.vanityURLCode}`;
      embed.addFields([
        { name: 'Vanity Invite URL', value: `[${url}](${url})` },
      ]);
    }

    message.reply({
      embeds: [embed],
    });
  },
};
