import { MessageEmbed, BaseCommandInteraction } from 'discord.js';

type commandArguments = {
  interaction: BaseCommandInteraction;
};

export default {
  name: 'ping',
  description: 'Check network delay.',
  type: 1,
  async({ interaction }: commandArguments) {
    const ms = Math.round(interaction.client.ws.ping);
    const delay = Date.now() - interaction.createdTimestamp;

    const embed = new MessageEmbed().setDescription(
      `動作延遲: \`${delay}ms\`\nAPI延遲: \`${ms}ms\``,
    );

    return interaction.reply({
      embeds: [embed],
    });
  },
};
