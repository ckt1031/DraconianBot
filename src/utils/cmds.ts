import { MessageEmbed, MessageButton, MessageActionRow } from 'discord.js';

import { findBestMatch } from 'string-similarity';

import type {
  Message,
  MessageComponentInteraction,
  CollectorFilter,
} from 'discord.js';

import type { TextCommand } from '../sturctures/command';

/** Send command information message embed. */
export function getCommandHelpInfo(cmd: TextCommand): MessageEmbed {
  const embed = new MessageEmbed()
    .setTitle(`Command: ${cmd.data.name}`)
    .addField('Description', cmd.data.description);
  if (cmd.data.usage) embed.addField('Usage', cmd.data.usage);
  embed
    .addField('Catagory', cmd.data.catagory!, true)
    .addField(
      'Cooldown',
      `${cmd.data.cooldownInterval! / 1000 || '3'} seconds`,
    );
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

  const acceptButton = new MessageButton()
    .setStyle('SUCCESS')
    .setEmoji('👍')
    .setCustomId(acceptButtonId);
  const declineButton = new MessageButton()
    .setStyle('DANGER')
    .setEmoji('👎')
    .setCustomId(declineButtonId);

  const row = new MessageActionRow().addComponents(acceptButton, declineButton);

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
        await _message.delete();
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
