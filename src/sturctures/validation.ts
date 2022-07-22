/* eslint-disable no-unused-vars */

enum CheckInviteLinks {
  None = 0,
  Detected = 1,
}

enum CheckMentions {
  Pass = 0,
  MassDetected = 1,
}

enum CheckLinks {
  Pass = 0,
  MassLink = 1,
  Malicious = 2,
  BlockedLink = 3,
}

enum CheckSpam {
  Pass = 0,
  Detected = 1,
  Whitelisted = 2,
  Error = 999,
}

export { CheckInviteLinks, CheckLinks, CheckMentions, CheckSpam };
