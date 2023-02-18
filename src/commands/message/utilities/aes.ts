import { AES, enc } from 'crypto-js';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'aes',
    description: 'Encrypt and Decrypt stuff by AES256.',
    directMessageAllowed: true,
    requiredArgs: [
      {
        name: 'mode',
        type: 'STRING',
        text: ['encrypt', 'decrypt'],
      },
      {
        name: 'key',
        type: 'STRING',
      },
      {
        name: 'value',
        type: 'STRING',
      },
    ],
  },
  run: async ({ message, args }) => {
    if (message.channel.isVoiceBased()) return;
    
    const [mode, key, ...value] = args;
    const string = value.join(' ');

    const embed = new EmbedBuilder();

    if (message.deletable) message.delete().catch(() => undefined);

    switch (mode) {
      case 'encrypt': {
        const encryptedValue = AES.encrypt(string, key).toString();

        embed.setTitle('Encryped Data:').setDescription(`\`\`\`${encryptedValue}\`\`\``);

        await message.channel.send({
          embeds: [embed],
        });
        break;
      }
      case 'decrypt': {
        const decryptedValue = AES.decrypt(string, key).toString(enc.Utf8);

        embed.setTitle('Decryped Data:').setDescription(`\`\`\`${decryptedValue}\`\`\``);

        await message.channel.send({
          embeds: [embed],
        });
        break;
      }
      default: {
        embed.setTitle('Wrong Type!').setDescription('`encrypt / decrypt` [key] [value...]');
        await message.reply({
          embeds: [embed],
        });
        break;
      }
    }
  },
};
