export interface GuildConfig {
  prefix: string;
  serverId: string;
  commands: {
    global: {
      // Access
      disabled: string[];
      disabledCatagories: string[];
      // Cooldown
      customCooldown: {
        name: string;
        value: number;
        intervals: {
          minute: number;
          hour: number;
          day: number;
        };
      }[];
    };
    // Access
    userDisabled: { id: string; cmds: string[] }[];
    roleDisabled: { id: string; cmds: string[] }[];
    channelDisabled: { id: string; cmds: string[] }[];
  };
  antiSpam: {
    enabled: boolean;
    whitelistedUsers: string[];
    whitelistedRoles: string[];
    whitelistedChannels: string[];
    inviteLinks: {
      enabled: boolean;
      whitelistedUsers: string[];
      whitelistedRoles: string[];
      whitelistedChannels: string[];
    };
    mentions: {
      enabled: boolean;
      maxmiumCheck: {
        enabled: boolean;
        value: number;
      };
      publicRoleCheck: boolean;
      whitelistedUsers: string[];
      whitelistedRoles: string[];
      whitelistedChannels: string[];
    };
  };
  thread: {
    listen?: boolean;
  };
  snipe: {
    channelDisabled: string[];
  };
}

export interface SnipeConfig {
  channelId: string;
  author: {
    id: string;
    name: string;
  };
  content: {
    text: string;
    date: number;
    imageURL: string | undefined;
  };
}
