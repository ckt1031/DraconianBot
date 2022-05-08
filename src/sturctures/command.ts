import type {
  Message,
  Permissions,
  PermissionResolvable,
  CommandInteraction,
  ApplicationCommandType,
  ApplicationCommandOptionData,
} from 'discord.js';

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

    // Access
    publicLevel?: 'All' | 'Permission' | 'None';
    authorRequiredPermissions?: PermissionResolvable[];
    inVoiceChannelRequired?: boolean;

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
  run: ({ message, args }: { message: Message; args: any[] }) => Promise<void>;
}

export interface SlashCommand {
  // SlashCommand Data
  readonly data: {
    // Info
    name: string;
    description: string;

    // Config
    type: ApplicationCommandType;
    options?: ApplicationCommandOptionData[];

    // Access
    cooldownInterval?: number;
    requiredPermissions?: Permissions[];
  };

  run: ({
    // eslint-disable-next-line no-unused-vars
    interaction,
    // eslint-disable-next-line no-unused-vars
    args,
  }: {
    interaction: CommandInteraction;
    args: any[];
  }) => Promise<void>;
}
