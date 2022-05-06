import { MessageEmbed } from 'discord.js';

import type { Message } from 'discord.js';
import type { TextCommand } from '../sturctures/command';

export function getCommandHelpInfo(message: Message, cmd: TextCommand): void {
  const embed = new MessageEmbed()
    .setTitle(`Command: ${cmd.data.name}`)
    .addField('Description', cmd.data.description);
  if (cmd.data.usage) embed.addField('Usage', cmd.data.usage);
  embed.addField('Catagory', cmd.data.catagory!, true);
  embed.addField('Cooldown', `${cmd.data.cooldownInterval! / 1000 || '3'} seconds`);
  message.reply({ embeds: [embed] });
}
