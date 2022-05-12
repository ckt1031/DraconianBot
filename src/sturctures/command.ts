import type {
  Message,
  PermissionResolvable,
  CommandInteraction,
} from 'discord.js';

import type { SlashCommandBuilder } from '@discordjs/builders';

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
    // Oneself Requirements
    clientRequiredPermissions?: PermissionResolvable[];

    // Access, Environment & Scenes
    ownerOnly?: boolean;
    developmentOnly?: boolean;

    nsfwChannelRequired?: boolean;
    inVoiceChannelRequired?: boolean;

    threadChannelAllowed?: boolean;
    directMessageAllowed?: boolean;

    publicLevel?: 'All' | 'Permission' | 'None';
    authorRequiredPermissions?: PermissionResolvable[];

    // Info
    name: string;
    description: string;
    catagory?: string;
    usage?: string;
    aliases?: string[];

    // Specified Configurations
    intervalLimit?: {
      minute?: number;
      hour?: number;
      day?: number;
    };
    cooldownInterval?: number;
  };
  // eslint-disable-next-line no-unused-vars
  run: ({ message, args }: { message: Message; args: any[] }) => Promise<void>;
}

export interface SlashCommand {
  // Slash Data
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

  readonly config?: {
    cooldownInterval?: number;
  };

  // eslint-disable-next-line no-unused-vars
  run: ({ interaction }: { interaction: CommandInteraction }) => Promise<void>;
}
