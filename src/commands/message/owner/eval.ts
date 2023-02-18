import { inspect } from 'node:util';

import type { TextCommand } from '../../../sturctures/command';
import { isDev } from '../../../utils/constants';

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
    name: 'eval',
    publicLevel: 'None',
    description: 'Eval javascript code in Nodejs runtime.',
    ownerOnly: true,
    developmentOnly: true,
    directMessageAllowed: true,
    requiredArgs: [
      {
        type: 'STRING',
        rest: true,
      },
    ],
  },
  run: async ({ message, args }) => {
    const { channel } = message;

    if (channel.isVoiceBased()) return;

    const code = args.join(' ');

    if (code) {
      try {
        let evaled = eval(code);
        if (typeof evaled !== 'string') evaled = inspect(evaled);
        if (evaled.length > 1999) return console.log(evaled);
        await channel.send({
          content: `\`\`\`${clean(evaled as string)}\`\`\``,
        });
      } catch (error) {
        if (error instanceof Error && error.message.length < 1999) {
          await channel.send({
            content: `\`ERROR\` \`\`\`xl\n${clean(error.message)}\n\`\`\``,
          });
        }
      }
    }
  },
};
