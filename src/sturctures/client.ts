import type { PermissionResolvable, InviteScope } from 'discord.js';

const requiredInviteScope: InviteScope[] = ['applications.commands', 'bot'];

const requiredPermissions: PermissionResolvable = ['USE_APPLICATION_COMMANDS'];

export default { requiredPermissions, requiredInviteScope };
