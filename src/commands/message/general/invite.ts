import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';
import { isDev } from '../../../utils/constants';

export const command: TextCommand = {
  data: {
    name: 'invite',
    description: 'Invite me to your server!',
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const { client } = message;

    if (isDev || client.application.botPublic) {
      const link = `https://discord.com/api/oauth2/authorize?client_id=${client.application.id}&permissions=1636381879799&scope=applications.commands%20bot`;

      const embed = new EmbedBuilder().setDescription(
        `Invite to your server: [HERE](${link})`,
      );

      await message.reply({
        embeds: [embed],
      });
    }
  },
};
