import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'avatar',
    aliases: ['av'],
    description: "Fetch user's avatar.",
    directMessageAllowed: true,
  },
  run: async ({ message, args }) => {
    const embed = new EmbedBuilder();

    const { guild, mentions, author } = message;

    let targetUser = mentions.users.first();

    if (!targetUser) {
      if (guild && args[0]) {
        if (args[0].length >= 18) {
          const idMember = guild.members.cache.get(args[0]);
          if (idMember) {
            targetUser = idMember.user;
          }
        } else {
          const username = String(args[0]).toLowerCase();
          const target = guild.members.cache.find(ur =>
            ur.user.username.toLowerCase().includes(username),
          );
          if (target) targetUser = target.user;
        }
      } else {
        targetUser = author;
      }
    }

    if (!targetUser) targetUser = author;

    const avatarURL = targetUser.displayAvatarURL({
      size: 4096,
    });

    embed
      .setTitle(`Icon from ${targetUser.tag}`)
      .setDescription(`Link: [Click Here](${avatarURL})`)
      .setImage(avatarURL);

    await message.reply({
      embeds: [embed],
    });
  },
};
