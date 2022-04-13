import { MessageEmbed } from 'discord.js';

export default {
  name: 'ping',
  desc: 'Check network delay.',
  directMessageAllowed: true,
  async({ msg }): void {
    const embed = new MessageEmbed().setDescription(
      `動作延遲: \`${
        Date.now() - msg.createdTimestamp
      }ms\`\nAPI延遲: \`${Math.round(msg.client.ws.ping)}ms\``,
    );

    return msg.reply({
      embeds: [embed],
    });
  },
};
