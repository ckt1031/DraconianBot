import { MessageEmbed } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'avatar',
    aliases: ['av'],
    description: "Fetch user's avatar.",
    directMessageAllowed: true,
  },
  run: async ({ message, args }) => {
    const embed = new MessageEmbed();

    const { guild } = message;

    let targetUser = message.mentions.users.first();

    if (!targetUser) {
      if (guild && args[0]) {
        if (args[0].length === 18) {
          const idMember = guild.members.cache.get(args[0]);
          if (idMember) {
            targetUser = idMember.user;
          }
        } else {
          const username = String(args[0]).toLowerCase();
          const target = guild.members.cache.find(ur =>
            ur.user.username.toLowerCase().includes(username),
          );
          if (target) {
            targetUser = target.user;
          }
        }
      } else {
        targetUser = message.author;
      }
    }

    if (!targetUser) {
      embed.setDescription('Cannot fetch specified user.');
      message.reply({
        embeds: [embed],
      });
      return;
    }

    const avatarURL = targetUser.displayAvatarURL({
      dynamic: false,
      format: 'png',
      size: 4096,
    });

    embed
      .setTitle(`Icon from ${targetUser.tag}`)
      .setDescription(`Link: [Click Here](${avatarURL})`)
      .setImage(avatarURL);

    message.reply({
      embeds: [embed],
    });
  },
};
