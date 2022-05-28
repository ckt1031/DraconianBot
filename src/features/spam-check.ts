import { Message } from 'discord.js';

import { guildConfiguration } from '../utils/database';
import {
  CheckInviteLinks,
  CheckMentions,
  // CheckLinks,
  CheckSpam,
} from '../sturctures/validation';

// const uneUnicode = (string_: string) =>
//   string_.replace(/\\u([\dA-Fa-f]{4})/g, (_, word) =>
//     String.fromCodePoint(Number.parseInt(word, 16)),
//   );

async function inviteLink(message: Message): Promise<CheckInviteLinks> {
  const guildData = guildConfiguration.get(message.guildId!);

  if (!guildData) return CheckInviteLinks.None;

  const antiSpam = guildData.antiSpam;

  if (antiSpam.inviteLinks.enabled !== true) {
    return CheckInviteLinks.None;
  }

  if (antiSpam.inviteLinks.whitelistedChannels.includes(message.channelId)) {
    return CheckInviteLinks.None;
  }

  if (antiSpam.inviteLinks.whitelistedUsers.includes(message.author.id)) {
    return CheckInviteLinks.None;
  }

  if (
    antiSpam.inviteLinks.whitelistedRoles.length > 0 &&
    message.member?.roles.cache
  ) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    for (const role of message.member?.roles.cache) {
      const hasRole = antiSpam.inviteLinks.whitelistedRoles.find(
        x => x === role[1].id,
      );
      if (hasRole) return CheckInviteLinks.None;
    }
  }

  const inv =
    /((|https?:\/\/)(discord\.gg|discord\.com\/invite|discordapp\.com\/invite))\/\S+/;

  if (!inv.test(message.content)) return CheckInviteLinks.None;

  // Space for future extra filterations.

  return CheckInviteLinks.Detected;
}

async function mentions(message: Message): Promise<CheckMentions> {
  const guildData = guildConfiguration.get(message.guildId!);

  if (!guildData) return CheckMentions.Pass;

  const antiSpam = guildData.antiSpam;

  if (antiSpam.mentions.enabled !== true) {
    return CheckMentions.Pass;
  }

  if (antiSpam.mentions.whitelistedChannels.includes(message.channelId)) {
    return CheckMentions.Pass;
  }

  if (antiSpam.mentions.whitelistedUsers.includes(message.author.id)) {
    return CheckMentions.Pass;
  }

  if (
    antiSpam.mentions.whitelistedRoles.length > 0 &&
    message.member?.roles.cache
  ) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    for (const role of message.member?.roles.cache) {
      const hasRole = antiSpam.mentions.whitelistedRoles.find(
        x => x === role[1].id,
      );
      if (hasRole) return CheckMentions.Pass;
    }
  }

  const mentionRegex = /(((<@!?)|(<@&)))\d+>/g;

  if (!mentionRegex.test(message.content)) return CheckMentions.Pass;

  const matches = message.content.match(mentionRegex);

  if (matches && matches.length >= antiSpam.mentions.maxmiumCheck.value!) {
    return CheckMentions.MassDetected;
  }

  return CheckMentions.Pass;
}

// async function checkLink(message: Message): CheckLinks {
//   // eslint-disable-next-line unicorn/no-unsafe-regex
//   const re = /(www.\S+|https?:\/\/\S+)|([\w-]+[.:]\w(([#&./=?]?[\w-]+))*\/?)/g;
//   const re2 = /[^\s\w%./:|-]/gi;
//   const comsg = uneUnicode(
//     message.content.toLowerCase().replace(re2, ''),
//   ).normalize();
//   const allLinkS = comsg.match(re);
//   const links = [...new Set(allLinkS)];
//   if (!links) return CheckLinks.Pass;
//   if (links.length > 7) return CheckLinks.MassLink;
//   if (links.length > 0) {
//   }
// }

async function checkSpam(message: Message): Promise<[CheckSpam, string]> {
  // Invite Links
  const inviteLinkCheck = await inviteLink(message);

  if (inviteLinkCheck === CheckInviteLinks.Detected) {
    const reason = 'Invite links cannot be sent.';

    return [CheckSpam.Detected, reason];
  }

  // Mentions
  const mentionsCheck = await mentions(message);

  if (mentionsCheck !== CheckMentions.Pass) {
    let reason = '';

    // eslint-disable-next-line sonarjs/no-small-switch
    switch (mentionsCheck) {
      case CheckMentions.MassDetected: {
        reason =
          'You have sent more than the maxmium value of mentions limited.';
        break;
      }
    }

    return [CheckSpam.Detected, reason];
  }

  return [CheckSpam.Pass, ''];
}

export { checkSpam, inviteLink, mentions };
