import type {
  Message,
  Permissions,
  CommandInteraction,
  ApplicationCommandType,
  ApplicationCommandOptionData,
} from 'discord.js';

type textCommandArugments = {
  message: Message;
  args: any[];
};

export interface TextCommand {
  // Command Data
  readonly data: {
    // Access
    enabled?: boolean;
    publicLevel?: 'All' | 'Permission' | 'None';
    requiredPermissions?: Permissions[];
    // Info
    name: string;
    description: string;
    catagory?: string;
    usage?: string;
    aliases?: string[];
    intervalLimit?: {
      minute?: number;
      hour?: number;
      day?: number;
    };
    // Environment & Scenes
    ownerOnly?: boolean;
    developmentOnly?: boolean;
    threadChannelAllowed?: boolean;
    directMessageAllowed?: boolean;
    // Specified Configurations
    cooldownInterval?: number;
  };
  // eslint-disable-next-line no-unused-vars
  run: ({ message, args }: textCommandArugments) => Promise<void>;
}

type slashCommandArugments = {
  interaction: CommandInteraction;
  args: any[];
};

export interface SlashCommand {
  // SlashCommand Data
  readonly data: {
    name: string;
    description: string;
    type: ApplicationCommandType;
    options?: ApplicationCommandOptionData[];
    requiredPermissions?: Permissions[];
    cooldownInterval?: number;
  };
  // eslint-disable-next-line no-unused-vars
  run: ({ interaction, args }: slashCommandArugments) => Promise<void>;
}
