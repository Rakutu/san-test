const API_URL = 'https://randomuser.me/api/?results=30';

export const getUsers = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Something went wrong, try later!');
    }

    return  await response.json();
  } catch (error) {

    throw error;
  }
}