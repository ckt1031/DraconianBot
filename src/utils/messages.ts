import type {
  CollectorFilter,
  ColorResolvable,
  EmbedField,
  Message,
  MessageComponentInteraction,
} from 'discord.js';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';

import emoji from '../../config/emojis.json';

interface ConfirmInformationButtons {
  title: string;
  message: Message;
  fields: EmbedField[];
}

export async function confirmInformationButtons({
  title,
  fields,
  message,
}: ConfirmInformationButtons): Promise<boolean> {
  const now = Date.now();
  const embed = new EmbedBuilder().setTitle(title).addFields(fields);

  const confirmId = `CONFIRM_${now}`;
  const cancelId = `CANCEL_${now}`;

  const buttonSuccess = new ButtonBuilder()
    .setStyle(ButtonStyle.Success)
    .setLabel('Confirm')
    .setCustomId(confirmId);
  const buttonCancel = new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setLabel('Cancel')
    .setCustomId(cancelId);

  const row: ActionRowBuilder<any> = new ActionRowBuilder().addComponents([
    buttonSuccess,
    buttonCancel,
  ]);

  const respondAwaiting = await message.channel.send({
    embeds: [embed],
    components: [row],
  });

  const filter: CollectorFilter<[MessageComponentInteraction]> = inter => {
    return [confirmId, cancelId].includes(inter.customId) && inter.user.id === message.author.id;
  };

  const interaction = await respondAwaiting.awaitMessageComponent({
    filter,
    time: 30_000,
  });

  if (respondAwaiting.deletable) await respondAwaiting.delete().catch(() => undefined);

  return interaction.customId === confirmId;
}

interface CallbackEmbed {
  text: string;
  color?: ColorResolvable;
  mode?: 'error' | 'success' | 'warning';
}

export function callbackEmbed({ text, color = 'Grey', mode }: CallbackEmbed): EmbedBuilder {
  let emojiText = '';

  if (mode && typeof mode === 'string') {
    emojiText = emoji[mode];
  }

  return new EmbedBuilder().setDescription(`${emojiText} ${text}`).setColor(color);
}
