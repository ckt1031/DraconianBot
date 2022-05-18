export interface GuildConfig {
  prefix: string;
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
  snipe: {
    channelDisabled: string[];
  };
}

export interface SnipeConfig {
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
