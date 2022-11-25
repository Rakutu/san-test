const USERS_KEY = 'users';

export const setUsersToLs = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsersFromLs = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);

    return users
      ? JSON.parse(users)
      : undefined;
  } catch (error) {

    throw error;
  }
};

export const deleteUsersFromLs = () => localStorage.removeItem(USERS_KEY);