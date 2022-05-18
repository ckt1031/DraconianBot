import GIFEncoder from 'gifencoder';
import { createCanvas, loadImage } from 'canvas';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'trigger',
    description: 'TRIGGER~.',
    directMessageAllowed: true,
    cooldownInterval: 10 * 1000,
  },
  run: async ({ message, args }) => {
    const { attachments, author, guild, channel } = message;

    let image = attachments.first()?.proxyURL;

    for (let index = 0; index < 2; index++) {
      if (image) break;

      if (index === 1) {
        image = author.displayAvatarURL({
          dynamic: false,
          format: 'png',
          size: 256,
        });
        break;
      }

      if (guild && args[0]) {
        if (args[0].length >= 18) {
          const idMember = guild.members.cache.get(args[0]);
          if (idMember) {
            image = idMember.user.displayAvatarURL({
              dynamic: false,
              format: 'png',
              size: 256,
            });
          }
        } else {
          const username = String(args[0]).toLowerCase();
          const target = guild.members.cache.find(ur =>
            ur.user.username.toLowerCase().includes(username),
          );
          if (target) {
            image = target.user.displayAvatarURL({
              dynamic: false,
              format: 'png',
              size: 256,
            });
          }
        }
      }
    }

    if (!image) return;

    const targetImage = await loadImage(image);
    const background = await loadImage('./assets/triggered.png');

    const gif = new GIFEncoder(256, 310);

    gif.start();
    gif.setRepeat(0);
    gif.setDelay(15);

    const canvas = createCanvas(256, 310);
    const context = canvas.getContext('2d');

    const BR = 30;
    const LR = 20;

    for (let index = 0; index < 9; index++) {
      context.clearRect(0, 0, 256, 310);
      context.drawImage(
        targetImage,
        Math.floor(Math.random() * BR) - BR,
        Math.floor(Math.random() * BR) - BR,
        256 + BR,
        310 - 54 + BR,
      );
      context.fillStyle = '#FF000033';
      context.fillRect(0, 0, 256, 310);
      context.drawImage(
        background,
        Math.floor(Math.random() * LR) - LR,
        310 - 54 + Math.floor(Math.random() * LR) - LR,
        256 + LR,
        54 + LR,
      );
      gif.addFrame(context);
    }

    gif.finish();

    channel.send({
      files: [
        { name: `${Date.now()}_trgigered.gif`, attachment: gif.out.getData() },
      ],
    });
  },
};
