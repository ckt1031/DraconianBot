import { Message, Permissions, CommandInteraction } from 'discord.js';

type textCommandArugments = {
  message: Message;
  args: any[];
};

export interface TextCommand {
  // Command Data
  readonly data: {
    // Info
    readonly name: string;
    readonly description: string;
    readonly aliases?: string[];
    // Specified Configurations
    readonly ownerOnly?: boolean;
    readonly cooldownInterval?: number;
    readonly directMessageAllowed?: boolean;
    readonly requiredPermissions?: Permissions[];
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
  data: {
    name: string;
    description: string;
    // directMessageAllowed?: boolean;
    requiredPermissions?: Permissions[];
  };
  // eslint-disable-next-line no-unused-vars
  run: ({ interaction, args }: slashCommandArugments) => Promise<void>;
}
