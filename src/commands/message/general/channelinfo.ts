import dayjs from 'dayjs';
import { EmbedBuilder } from 'discord.js';
import type { TextChannel, ThreadChannel, VoiceChannel } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'channelinfo',
    description: "Check server's channel information.",
    directMessageAllowed: false,
  },
  run: async ({ message, args }) => {
    const { guild, channel, mentions, member } = message;

    if (!guild || !channel || !member) return;

    const targetNameId = args[0];

    let targetChannel = mentions.channels.first();

    if (!targetChannel && targetNameId) {
      const fetchedChannel = guild.channels.cache.get(targetNameId);
      if (fetchedChannel) targetChannel = fetchedChannel;
      else {
        const name = String(targetNameId).toLowerCase();
        const fetchedChannelByKW = guild.channels.cache.find(ur =>
          ur.name.toLowerCase().includes(name),
        );
        if (fetchedChannelByKW) targetChannel = fetchedChannelByKW;
      }
    }

    if (!targetChannel) targetChannel = channel;

    const embed = new EmbedBuilder();

    if (targetChannel.isTextBased()) {
      const textChannel = targetChannel as TextChannel;

      embed.setTitle(`${textChannel.name}'s information:`).addFields([
        { name: 'ID', value: textChannel.id },
        {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          name: 'Created on',
          // eslint-disable-next-line sonarjs/no-duplicate-string
          value: dayjs(textChannel.createdAt.getTime()).format('DD/MM/YYYY'),
          inline: true,
        },
      ]);

      if (textChannel.parent?.name) {
        embed.addFields([
          {
            name: 'Parent',
            value: textChannel.parent?.name,
            inline: true,
          },
        ]);
      }

      embed.addFields([
        {
          name: 'Position',
          value: textChannel.rawPosition.toString(),
          inline: true,
        },
        {
          name: 'NSFW',
          value: textChannel.nsfw ? 'YES' : 'NO',
          inline: true,
        },
        {
          name: 'Viewable',
          value: textChannel.viewable ? 'YES' : 'NO',
          inline: true,
        },
      ]);

      embed.setFooter({
        iconURL: guild.iconURL()!,
        text: `Shard ID: ${guild.shardId}`,
      });

      message.reply({
        embeds: [embed],
      });

      return;
    }

    if (targetChannel.isThread()) {
      const voiceChannel = targetChannel as ThreadChannel;

      embed.setTitle(`${voiceChannel.name}'s information:`).addFields([
        { name: 'ID', value: voiceChannel.id },
        {
          name: 'Created on',
          value: dayjs(voiceChannel.createdAt?.getTime()).format('DD/MM/YYYY'),
          inline: true,
        },
      ]);

      if (voiceChannel.parent?.name) {
        embed.addFields([
          {
            name: 'Parent',
            value: voiceChannel.parent?.name,
            inline: true,
          },
        ]);
      }

      embed.addFields([
        {
          name: 'Joinable',
          value: voiceChannel.joinable ? 'YES' : 'NO',
          inline: true,
        },
        {
          name: 'Locked',
          value: voiceChannel.locked ? 'YES' : 'NO',
          inline: true,
        },
      ]);

      embed.setFooter({
        iconURL: guild.iconURL()!,
        text: `Shard ID: ${guild.shardId}`,
      });

      message.reply({
        embeds: [embed],
      });
    }

    if (targetChannel.isVoiceBased()) {
      const voiceChannel = targetChannel as unknown as VoiceChannel;

      embed.setTitle(`${voiceChannel.name}'s information:`).addFields([
        { name: 'ID', value: voiceChannel.id },
        {
          name: 'Created on',
          value: dayjs(voiceChannel.createdAt.getTime()).format('DD/MM/YYYY'),
          inline: true,
        },
      ]);

      if (voiceChannel.parent?.name) {
        embed.addFields([
          {
            name: 'Parent',
            value: voiceChannel.parent?.name,
            inline: true,
          },
        ]);
      }

      embed.addFields([
        {
          name: 'Position',
          value: voiceChannel.rawPosition.toString(),
          inline: true,
        },
        {
          name: 'Joinable',
          value: voiceChannel.joinable ? 'YES' : 'NO',
          inline: true,
        },
        {
          name: 'Speakable',
          value: voiceChannel.speakable ? 'YES' : 'NO',
          inline: true,
        },
      ]);

      embed.setFooter({
        iconURL: guild.iconURL()!,
        text: `Shard ID: ${guild.shardId}`,
      });

      message.reply({
        embeds: [embed],
      });
    }
  },
};
