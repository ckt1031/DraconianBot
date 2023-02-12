import { exec } from 'node:child_process';
import { isDev } from '../../../utils/constants';

import type { TextCommand } from '../../../sturctures/command';

function clean(text: string) {
  if (typeof text === 'string') {
    return text
      .replaceAll('`', `\`${String.fromCodePoint(8203)}`)
      .replaceAll(/@/g, `@${String.fromCodePoint(8203)}`);
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
  run: async ({ message, args }) => {
    const code = args.join(' ');

    if (code) {
      exec(code, (error, stdout, stderr) => {
        if (error) {
          message.channel.send({
            content: `\`ERROR\` \`\`\`xl\n${clean(error.message)}\n\`\`\``,
          });
          return;
        }

        if (stderr) {
          message.channel.send({
            content: `\`ERROR\` \`\`\`xl\n${clean(stderr)}\n\`\`\``,
          });
          return;
        }

        message.channel.send({ content: `\`\`\`${clean(stdout)}\`\`\`` });
      });
    }
  },
};
