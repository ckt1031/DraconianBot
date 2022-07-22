import type {
  CollectorFilter,
  Message,
  MessageComponentInteraction,
} from 'discord.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from 'discord.js';
import { findBestMatch } from 'string-similarity';

import type { TextCommand } from '../sturctures/command';

/** Send command information message embed. */
export function getCommandHelpInfo(cmd: TextCommand): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(`Command: ${cmd.data.name}`)
    .addFields([{ name: 'Description', value: cmd.data.description }]);
  if (cmd.data.usage) {
    embed.addFields([{ name: 'Usage', value: cmd.data.usage }]);
  }

  embed.addFields([
    { name: 'Catagory', value: cmd.data.catagory!, inline: true },
    {
      name: 'Cooldown',
      value: `${cmd.data.cooldownInterval! / 1000 || '3'} seconds`,
      inline: true,
    },
  ]);

  if (cmd.data.intervalLimit) {
    embed.addFields([
      {
        name: 'Allowed Intervals',
        value: Object.entries(cmd.data.intervalLimit)
          .map(value => {
            return `${value[0]} - \`${value[1]}\``;
          })
          .join('\n'),
        inline: false,
      },
    ]);
  }
  return embed;
}

interface ExpectedWord {
  name: string;
  timeTaken: number;
}

/** Similarity check of excuting commands. */
export async function resembleCommandCheck(
  message: Message,
  word: string,
): Promise<ExpectedWord | undefined> {
  const timeStarted = Date.now();

  const cmdList = [...message.client.commands.keys()];

  const { bestMatch } = findBestMatch(word, cmdList);

  if (bestMatch.rating < 0.65) return undefined;

  const acceptButtonId = 'accCMD';
  const declineButtonId = 'denCMD';

  const acceptButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Success)
    .setEmoji('👍')
    .setCustomId(acceptButtonId);
  const declineButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setEmoji('👎')
    .setCustomId(declineButtonId);

  const row: ActionRowBuilder<any> = new ActionRowBuilder().addComponents([
    acceptButton,
    declineButton,
  ]);

  const matchRate = Number(bestMatch.rating.toFixed(2));

  const _message = await message.reply({
    content: `Do you prefer excuting \`${bestMatch.target}\`? (Similarity: \`${
      matchRate * 100
    }%\`)`,
    components: [row],
  });

  const filter: CollectorFilter<[MessageComponentInteraction]> = inter => {
    return (
      [acceptButtonId, declineButtonId].includes(inter.customId) &&
      inter.user.id === message.author.id
    );
  };

  return new Promise(resolve => {
    return _message
      .awaitMessageComponent({
        filter,
        time: 30_000,
      })
      .then(async _inter => {
        // Delete message first
        if (_message.deletable) {
          // eslint-disable-next-line promise/no-nesting
          await _message.delete().catch(() => {});
        }
        if (_inter.customId === acceptButtonId) {
          const timeTaken = timeStarted - Date.now();
          return resolve({ name: bestMatch.target, timeTaken });
        }
        throw 0;
      })
      .catch(() => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        return resolve(undefined);
      });
  });
}
