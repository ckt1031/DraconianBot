/* eslint-disable unicorn/filename-case */
import type { Client, Message } from 'discord.js';

export default async (client: Client, message: Message): Promise<void> => {
  // Init
  const { content, channel, author, webhookId, partial, member, guild } =
    message;

  if (author.bot) return;
  if (webhookId || author.id === client.user?.id) return;
  if (partial) await message.fetch();

  // eslint-disable-next-line sonarjs/no-collapsible-if
  if (guild) {
    // Fetch Member
    // eslint-disable-next-line unicorn/no-lonely-if
    if (!member) {
      const member = await guild.members.fetch(author.id).catch(() => {});
      if (!member) return;
    }
  }

  const prefixRe = new RegExp(`^(<@!?${client.user?.id}>)`);
  const mentionTest = prefixRe.test(content);
  if (mentionTest) {
    channel.send('嘿, 我的指令開首: `k!`');
    // eslint-disable-next-line sonarjs/no-redundant-jump
    return;
  }
};
