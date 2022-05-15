import dayjs from 'dayjs';
import { MessageEmbed } from 'discord.js';

import type { TextChannel, VoiceChannel } from 'discord.js';
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

    const embed = new MessageEmbed();

    if (targetChannel.isText()) {
      const textChannel = targetChannel as TextChannel;

      embed
        .setTitle(`${textChannel.name}'s information:`)
        .addField('ID', textChannel.id)
        .addField(
          'Created on',
          dayjs(textChannel.createdAt.getTime()).format('DD/MM/YYYY'),
          true,
        );

      if (textChannel.parent?.name) {
        embed.addField('Parent', textChannel.parent?.name, true);
      }

      embed.addField('Position', textChannel.rawPosition.toString(), true);

      embed.addField('NSFW', textChannel.nsfw ? 'YES' : 'NO', true);

      embed.addField('Viewable', textChannel.viewable ? 'YES' : 'NO', true);

      embed.setFooter({
        iconURL: guild.iconURL()!,
        text: `Shard ID: ${guild.shardId}`,
      });

      message.reply({
        embeds: [embed],
      });

      return;
    }

    if (targetChannel.isVoice()) {
      const voiceChannel = targetChannel as VoiceChannel;
      embed
        .setTitle(`${voiceChannel.name}'s information:`)
        .addField('ID', voiceChannel.id)
        .addField(
          'Created on',
          dayjs(voiceChannel.createdAt.getTime()).format('DD/MM/YYYY'),
          true,
        );

      if (voiceChannel.parent?.name) {
        embed.addField('Parent', voiceChannel.parent?.name, true);
      }

      embed.addField('Position', voiceChannel.rawPosition.toString(), true);

      embed.addField('Joinable', voiceChannel.joinable ? 'YES' : 'NO', true);

      embed.addField('Speakable', voiceChannel.speakable ? 'YES' : 'NO', true);

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
