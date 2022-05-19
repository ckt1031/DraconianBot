import { createCanvas, loadImage } from 'canvas';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'jail',
    description: 'JAIL.',
    directMessageAllowed: true,
    cooldownInterval: 10 * 1000,
  },
  run: async ({ message, args }) => {
    const { attachments, author, guild, channel } = message;

    // Image fetching
    let image = attachments.first()?.proxyURL;

    for (let index = 0; index < 2; index++) {
      if (image) break;

      if (index === 1) {
        image = author.displayAvatarURL();
        break;
      }

      if (guild && args[0]) {
        if (args[0].length >= 18) {
          const idMember = guild.members.cache.get(args[0]);
          if (idMember) {
            image = idMember.user.displayAvatarURL();
          }
        } else {
          const username = String(args[0]).toLowerCase();
          const target = guild.members.cache.find(ur =>
            ur.user.username.toLowerCase().includes(username),
          );
          if (target) {
            image = target.user.displayAvatarURL();
          }
        }
      }
    }

    if (!image) return;

    const targetImage = await loadImage(image);
    const background = await loadImage('./assets/jail.png');

    const canvas = createCanvas(350, 350);
    const context = canvas.getContext('2d');

    context.drawImage(targetImage, 0, 0, canvas.width, canvas.height);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    channel.send({
      files: [
        { name: `${Date.now()}_jail.png`, attachment: canvas.toBuffer() },
      ],
    });
  },
};
