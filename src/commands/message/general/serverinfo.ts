import dayjs from 'dayjs';
import { MessageEmbed } from 'discord.js';

import type { GuildMember } from 'discord.js';
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

    const embed = new MessageEmbed()
      .setThumbnail(guild.iconURL()!)
      .setTitle(`${guild.name}'s information:`)
      .addField('Owner', owner.user.tag, true)
      .addField(
        'Created on',
        dayjs(guild.createdAt.getTime()).format('DD/MM/YYYY'),
        true,
      )
      .addField('User Count', guild.memberCount.toString(), true)
      .addField(
        'Bot Count',
        guild.members.cache
          .filter((m: GuildMember) => m.user.bot)
          .size.toString(),
        true,
      )
      .addField('Roles', guild.roles.cache.size.toString(), true)
      .addField('Channels', guild.channels.cache.size.toString(), true)
      .addField('Emojis', guild.emojis.cache.size.toString(), true)
      .addField('Verification Level', guild.verificationLevel, true)
      .setFooter({
        text: `Shard ID: ${guild.shardId}`,
      });

    if (guild.description) embed.setDescription(guild.description);

    if (guild.premiumSubscriptionCount) {
      embed.addField(
        'Total Boosts',
        guild.premiumSubscriptionCount.toString(),
        true,
      );
    }

    if (guild.vanityURLCode) {
      const url = `https://discord.gg/${guild.vanityURLCode}`;
      embed.addField('Vanity Invite URL', `[${url}](${url})`);
    }

    message.reply({
      embeds: [embed],
    });
  },
};
