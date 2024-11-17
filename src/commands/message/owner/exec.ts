import { exec } from 'node:child_process';

import type { TextCommand } from '../../../sturctures/command';
import { isDev } from '../../../utils/constants';

function clean(text: string) {
  if (typeof text === 'string') {
    return text
      .replaceAll('`', `\`${String.fromCodePoint(8203)}`)
      .replaceAll('@', `@${String.fromCodePoint(8203)}`);
  }
  return text;
}

export const command: TextCommand = {
  enabled: isDev,
  data: {
    name: 'exec',
    publicLevel: 'None',
    ownerOnly: true,
    developmentOnly: true,
    description: 'Execute shell command in Nodejs runtime.',
    directMessageAllowed: true,
    requiredArgs: [
      {
        type: 'STRING',
        rest: true,
      },
    ],
  },
  run: ({ message, args }) => {
    const { channel } = message;
    if (channel.isVoiceBased()) return;

    const code = args.join(' ');

    if (code) {
      exec(code, async (error, stdout, stderr) => {
        if (!channel.isSendable()) return;

        if (error) {
          await channel.send({
            content: `\`ERROR\` \`\`\`xl\n${clean(error.message)}\n\`\`\``,
          });
          return;
        }

        if (stderr) {
          await channel.send({
            content: `\`ERROR\` \`\`\`xl\n${clean(stderr)}\n\`\`\``,
          });
          return;
        }

        await channel.send({ content: `\`\`\`${clean(stdout)}\`\`\`` });
      });
    }
  },
};
