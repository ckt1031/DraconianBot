import { EmbedBuilder, Util } from 'discord.js';
import { parse } from 'twemoji-parser';

import type { TextCommand } from '../../../sturctures/command';
import { callbackEmbed } from '../../../utils/messages';

export const command: TextCommand = {
  data: {
    name: 'enlarge_emoji',
    aliases: ['eem'],
    description: 'Enlarge emoji to BIG picture file in message',
    directMessageAllowed: true,
  },
  run: async ({ message, args }) => {
    const embed = new EmbedBuilder();

    const emoji = args[0];

    if (!emoji) {
      const cEmbed = callbackEmbed({
        text: 'Missing Emoji',
        color: 'Red',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    const emojiParsed = Util.parseEmoji(emoji);

    if (!emojiParsed) {
      const cEmbed = callbackEmbed({
        text: 'Error when parsing emoji',
        color: 'Red',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    embed.setTitle(`Enlarged version of ${emojiParsed?.name}`);

    const id = emojiParsed?.id;

    if (id) {
      embed.setImage(
        `https://cdn.discordapp.com/emojis/${id}.${
          emojiParsed.animated ? 'gif' : 'png'
        }`,
      );
      message.channel.send({
        embeds: [embed],
      });
      return;
    }

    const parsed = parse(emoji, { assetType: 'png' });

    if (!parsed[0]) {
      const cEmbed = callbackEmbed({
        text: 'Invalid emoji!',
        color: 'Red',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    embed.setImage(parsed[0].url);

    message.reply({
      embeds: [embed],
    });
  },
};
