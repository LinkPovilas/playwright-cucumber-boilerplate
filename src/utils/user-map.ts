interface User {
  email: string;
  password: string;
}

const userMap = new Map<string, User>([
  [
    'valid_user',
    {
      email: 'john.doe@hero.com',
      password: 'SimplePassword%567',
    },
  ],
  [
    'invalid_username',
    {
      email: 'invalid@hero.com',
      password: 'SimplePassword%567',
    },
  ],
]);

export const getUserData = (userType: string): User => {
  const user = userMap.get(userType);
  if (!user) {
    throw new Error(`Uknown user type: "${userType}".`);
  }
  return user;
};
