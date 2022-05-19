import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  enabled: process.env.NODE_ENV === 'development',
  data: {
    name: 'listserver',
    publicLevel: 'None',
    ownerOnly: true,
    developmentOnly: true,
    description: 'Execute shell command in Nodejs runtime.',
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const { client } = message;

    const servers = client.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .map(r => r)
      .map((server, index) => {
        return `**${index + 1}** - ${server.name} | ${
          server.memberCount
        } Member`;
      })
      .slice(0, 10)
      .join('\n');

    console.log(servers);
  },
};
