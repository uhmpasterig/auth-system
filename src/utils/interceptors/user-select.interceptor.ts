import { Prisma } from '@prisma/client';
import { SanitizeInterceptor } from './sanitize.interceptor';

// User keys that should not be returned to the client
const USER_SELECT_DEFAULT_BLACKLIST: UserKeys[] = ['password', 'email'];
type UserKeys = keyof Prisma.UserSelect;

export const UserSelectInterceptor = (...keys: UserKeys[]) => {
  const USER_SELECT_BLACKLIST = [
    ...USER_SELECT_DEFAULT_BLACKLIST,
    ...(keys ?? []),
  ];
  return new SanitizeInterceptor(USER_SELECT_BLACKLIST);
};
