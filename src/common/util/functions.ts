import { User } from '../types/user.types';

export class Functions {
  static getUserDisplayName(user: User) {
    if (!user) {
      return undefined;
    }
    const { username, firstName, lastName, secondName } = user;
    if (!firstName && !lastName) {
      return username;
    }
    if (lastName && firstName && secondName) {
      return `${lastName} ${firstName.substring(0, 1)}. ${secondName.substring(
        0,
        1,
      )}. (${username})`;
    }
    if (lastName && firstName) {
      return `${lastName} ${firstName} (${username})`;
    }
    if (firstName && secondName) {
      return `${firstName}. ${secondName}. (${username})`;
    }
    if (lastName) {
      return `${lastName} (${username})`;
    }
    return username;
  }
}
