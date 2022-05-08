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
  data: {
    name: 'eval',
    publicLevel: 'None',
    ownerOnly: true,
    developmentOnly: true,
    description: 'Eval javascript code in Nodejs runtime.',
    directMessageAllowed: true,
  },
  run: async ({ message, args }) => {
    try {
      const code = args.join(' ');
      let evaled = eval(code);
      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
      if (evaled.length > 1999) return console.log(evaled);
      message.channel.send({ content: `\`\`\`${clean(evaled)}\`\`\`` });
    } catch (error) {
      if (error instanceof Error && error.message.length > 1999) {
        message.channel.send({
          content: `\`ERROR\` \`\`\`xl\n${clean(error.message)}\n\`\`\``,
        });
      }
    }
  },
};
