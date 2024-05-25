import type { SlashCommandOptionsOnlyBuilder } from '@discordjs/builders';
import type { CommandInteraction, Message, PermissionResolvable } from 'discord.js';

interface TextCommandExecution {
  message: Message;
  args: string[];
}

interface SlashCommandExecution {
  interaction: CommandInteraction;
}

interface TextCommandRequiredArgumentsDefault {
  name?: string;
  rest?: boolean;
  text?: string[];
  type: 'NUMBER' | 'STRING';
  customLength?: {
    min?: number;
    max?: number;
  };
  required?: boolean;
}

type TextCommandRequiredArguments = TextCommandRequiredArgumentsDefault;

/**
 * As default, command can only be accessed in guild.
 *
 * Everyone can access wihtout any permission limitations.
 *
 * Cooldown Interval is 3 seconds (3000 milliseconds)
 */
export interface TextCommand {
  enabled?: boolean;

  // Command Data
  readonly data: {
    // Permissions
    clientRequiredPermissions?: PermissionResolvable[];
    authorRequiredPermissions?: PermissionResolvable[];

    // Access, Environment & Scenes
    ownerOnly?: boolean;
    developmentOnly?: boolean;
    nsfwChannelRequired?: boolean;
    inVoiceChannelRequired?: boolean;
    threadChannelAllowed?: boolean;
    directMessageAllowed?: boolean;
    publicLevel?: 'All' | 'Permission' | 'None';
    requiredArgs?: TextCommandRequiredArguments[];

    // Info
    name: string;
    description: string;
    catagory?: string;
    usage?: string;
    aliases?: string[];

    // Specified Configurations
    cooldownInterval?: number;
    intervalLimit?: {
      minute?: number;
      hour?: number;
      day?: number;
    };
  };
  // eslint-disable-next-line no-unused-vars
  run: ({ message, args }: TextCommandExecution) => Promise<void> | void;
}

export interface SlashCommand {
  enabled?: boolean;

  // Slash Data
  slashData: Omit<SlashCommandOptionsOnlyBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

  readonly data?: {
    clientRequiredPermissions?: PermissionResolvable[];

    ownerOnly?: boolean;
    developmentOnly?: boolean;

    cooldownInterval?: number;
  };

  // eslint-disable-next-line no-unused-vars
  run: ({ interaction }: SlashCommandExecution) => Promise<void>;
}
