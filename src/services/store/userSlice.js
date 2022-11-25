import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './asyncActions';
import { getFiltersFromLs, setFiltersToLs } from '../utils/filtersLocalStorage';
import { setUsersToLs } from '../utils/usersLocalStorage';


const sortUsersByAge = (users, from = -999, to = 999) => {
  return users.filter(({ dob }) =>  dob.age > from && dob.age < to);
}

const sortUsersByGender = (users, filter) => {
  if (filter === 'ALL') return users;

  return users.filter(({ gender }) => gender === filter);
}

const sortUsersBySubstring = (users, substring) => {
  if (!substring) return users;

  return users.filter(({ name: { first, last } }) =>
    `${first.toLowerCase()}${last.toLowerCase()}`.includes(substring)
  );
}

const initialState = {
  users: [],
  showUsers: [],
  genderFilter: 'ALL',
  ageFilter: null,
  status: null,
  error: null,
}

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const setLoading = (state) => {
  state.status = 'pending';
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeGenderFilter(state, action) {
      const genderFilter = action.payload.genderFilter;
      const newShowUsers = sortUsersByGender(state.users, genderFilter);

      state.showUsers = newShowUsers;
      state.genderFilter = genderFilter;
      state.ageFilter = null;

      setFiltersToLs({
        genderFilter,
        ageFilter: state.ageFilter,
      });
      setUsersToLs(newShowUsers);
    },
    changeAgeFilter(state, action) {
      const ageFilter = action.payload.ageFilter;

      if (state.ageFilter !== ageFilter) {
        const [ from, to ] = ageFilter.split('-');
        const newShowUsers = sortUsersByAge(state.users, from, to);

        state.showUsers = newShowUsers;
        state.ageFilter = ageFilter;
        state.genderFilter = 'ALL';

        setFiltersToLs({
          ageFilter,
          genderFilter: state.genderFilter,
        });
        setUsersToLs(newShowUsers);

        return
      }

      state.ageFilter = null;
      state.showUsers = state.users;

      setFiltersToLs({
        ageFilter: null,
        genderFilter: state.genderFilter,
      });
      setUsersToLs(state.users);
    },
    changeShowUsersBySubstring(state, action) {
      const substring = action.payload.substring;
      const newShowUsers = sortUsersBySubstring(state.users, substring);

      state.showUsers = newShowUsers;
      state.ageFilter = null;
      state.genderFilter = 'ALL';

      setFiltersToLs({
        ageFilter: null,
        genderFilter: state.genderFilter,
      });
      setUsersToLs(newShowUsers);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (!action.payload) {
          state.status = 'rejected';
          state.error = 'users not found';

          return;
        }

        const filtersFromLS = getFiltersFromLs();

        if (filtersFromLS) {
          state.genderFilter = filtersFromLS.genderFilter;
          state.ageFilter = filtersFromLS.ageFilter;
        }

        state.users = action.payload;
        state.showUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, setError)
      .addCase(fetchUsers.pending, setLoading);
  }
})

export const { changeAgeFilter, changeGenderFilter, changeShowUsersBySubstring } = usersSlice.actions;

export default usersSlice.reducer;