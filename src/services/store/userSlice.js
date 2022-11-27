import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './asyncActions';
import { getFiltersFromLs, setFiltersToLs } from '../utils/filtersLocalStorage';


const sortUsersByAge = (users, ageFilter) => {
  const newUsers = [];
  let allUsers = true;

  users.forEach(user => {
    for (let ageInterval in ageFilter) {
      if (ageFilter[ageInterval]) {
        allUsers = false;
        const [ from, to ] = ageInterval.split('-');

        if (user.dob.age > from && user.dob.age < to) {
          newUsers.push(user)
        }
      }
    }
  });

  return allUsers
    ? users
    : newUsers;
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

const sortUsers = (state) => {
  const {
    users,
    ageFilter,
    genderFilter,
    substring,
  } = state;

  let newUsers = [ ...users ];
  if (genderFilter !== 'ALL') newUsers = sortUsersByGender(newUsers, genderFilter);

  newUsers = sortUsersByAge(newUsers, ageFilter);
  newUsers = sortUsersBySubstring(newUsers, substring);

  return newUsers;
}

const initialState = {
  users: [],
  showUsers: [],
  genderFilter: 'ALL',
  ageFilter: {
    '0-18': false,
    '18-35': false,
    '35-65': false,
    '65': false,
  },
  substring: '',
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

      state.genderFilter = genderFilter;
      state.showUsers = sortUsers(state);

      setFiltersToLs({
        ageFilter: state.ageFilter,
        substring: state.substring,
        genderFilter,
      });
    },
    changeAgeFilter(state, action) {
      const ageFilter = action.payload.ageFilter;

      state.ageFilter = ageFilter;
      state.showUsers = sortUsers(state);

      setFiltersToLs({
        genderFilter: state.genderFilter,
        substring: state.substring,
        ageFilter,
      });
    },
    changeSubstring(state, action) {
      const substring = action.payload.substring;

      state.substring = substring;
      state.showUsers = sortUsers(state);

      setFiltersToLs({
        ageFilter: state.ageFilter,
        genderFilter: state.genderFilter,
        substring,
      });
    },
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
          state.substring = filtersFromLS.substring;
          state.genderFilter = filtersFromLS.genderFilter;
          state.ageFilter = filtersFromLS.ageFilter;
        }

        state.users = action.payload;
        state.showUsers = sortUsers(state);
      })
      .addCase(fetchUsers.rejected, setError)
      .addCase(fetchUsers.pending, setLoading);
  }
})

export const { changeAgeFilter, changeGenderFilter, changeSubstring } = usersSlice.actions;

export default usersSlice.reducer;