export * from './schema/user.schema';
export * from './schema/role.schema';
export * from './schema/user-role.schema';
import { users } from './schema/user.schema';
import { roles } from './schema/role.schema';
import { userRoles } from './schema/user-role.schema';

export const schema = {
  users,
  roles,
  userRoles,
};
