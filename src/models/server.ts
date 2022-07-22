import { Schema, model } from 'mongoose';

import { GuildConfig } from '../sturctures/database';

const ModuleSchema = new Schema<GuildConfig>({
  prefix: { type: String, default: 'd!' },
  serverId: { type: String, index: true },
  commands: {
    global: {
      // Access
      disabled: { type: [String] },
      disabledCatagories: { type: [String] },
      // Cooldown
      customCooldown: [
        {
          name: { type: String },
          value: { type: Number },
          intervals: {
            minute: { type: Number },
            hour: { type: Number },
            day: { type: Number },
          },
        },
      ],
    },
    // Access
    userDisabled: [{ id: String, cmds: [String] }],
    roleDisabled: [{ id: String, cmds: [String] }],
    channelDisabled: [{ id: String, cmds: [String] }],
  },
  antiSpam: {
    enabled: { type: Boolean, default: false },
    whitelistedUsers: { type: [String] },
    whitelistedRoles: { type: [String] },
    whitelistedChannels: { type: [String] },
    inviteLinks: {
      enabled: { type: Boolean, default: false },
      whitelistedUsers: { type: [String] },
      whitelistedRoles: { type: [String] },
      whitelistedChannels: { type: [String] },
    },
    mentions: {
      enabled: { type: Boolean, default: false },
      maxmiumCheck: {
        enabled: { type: Boolean, default: false },
        value: { type: Number },
      },
      publicRoleCheck: { type: Boolean },
      whitelistedUsers: { type: [String] },
      whitelistedRoles: { type: [String] },
      whitelistedChannels: { type: [String] },
    },
  },
  thread: {
    listen: { type: Boolean, default: false },
  },
  snipe: {
    channelDisabled: { type: [String] },
  },
});

export default model('bans', ModuleSchema);
