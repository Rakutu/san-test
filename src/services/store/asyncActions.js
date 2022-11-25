import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUsersFromLs, getUsersFromLs, setUsersToLs } from '../utils/usersLocalStorage';
import { getUsers } from '../api/getUsers';


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const usersFromLs = getUsersFromLs();

      if (usersFromLs && usersFromLs.length > 0) return usersFromLs;
      if (usersFromLs && usersFromLs.length === 0) deleteUsersFromLs();

      const users = await getUsers();

      setUsersToLs(users.results);

      return users.results;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      rejectWithValue(error);
    }
  }
)