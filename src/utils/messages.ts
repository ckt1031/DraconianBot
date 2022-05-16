import { MessageEmbed, MessageButton, MessageActionRow } from 'discord.js';

import emoji from '../../config/emojis.json';

import type {
  Message,
  EmbedFieldData,
  CollectorFilter,
  ColorResolvable,
  MessageComponentInteraction,
} from 'discord.js';

interface ConfirmInformationButtons {
  title: string;
  message: Message;
  fields: EmbedFieldData[];
}

export async function confirmInformationButtons({
  title,
  fields,
  message,
}: ConfirmInformationButtons): Promise<boolean> {
  const now = Date.now();
  const embed = new MessageEmbed().setTitle(title).addFields(fields);

  const confirmId = `CONFIRM_${now}`;
  const cancelId = `CANCEL_${now}`;

  const buttonSuccess = new MessageButton()
    .setStyle('SUCCESS')
    .setLabel('Confirm')
    .setCustomId(confirmId);
  const buttonCancel = new MessageButton()
    .setStyle('DANGER')
    .setLabel('Cancel')
    .setCustomId(cancelId);

  const row = new MessageActionRow().addComponents(buttonSuccess, buttonCancel);

  const respondAwaiting = await message.channel.send({
    embeds: [embed],
    components: [row],
  });

  const filter: CollectorFilter<[MessageComponentInteraction]> = inter => {
    return (
      [confirmId, cancelId].includes(inter.customId) &&
      inter.user.id === message.author.id
    );
  };

  const interaction = await respondAwaiting.awaitMessageComponent({
    filter,
    time: 30_000,
  });

  if (respondAwaiting.deletable) await respondAwaiting.delete();

  return interaction.customId === confirmId;
}

interface CallbackEmbed {
  text: string;
  color?: ColorResolvable;
  mode?: 'error' | 'success' | 'warning';
}

export function callbackEmbed({
  text,
  color,
  mode,
}: CallbackEmbed): MessageEmbed {
  let emojiText = '';

  if (mode && typeof mode === 'string') {
    emojiText = emoji[mode];
  }

  return new MessageEmbed()
    .setDescription(`${emojiText} ${text}`)
    .setColor(color!);
}
