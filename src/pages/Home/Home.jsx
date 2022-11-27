import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../../services/utils/debounce';
import { changeSubstring } from '../../services/store/userSlice';
import { TextField } from '../../Components/TextField';
import { Filters } from '../../Components/Filters';
import { UserList } from '../../Components/Userlist';


export const Home = () => {
  const dispatch = useDispatch();
  const { substring } = useSelector(({ users }) => users);
  const handleInputChange = debounce(
    (value) => dispatch(changeSubstring({ substring: value })),
  );

  return (
    <main className='container'>
      <form>
        <TextField
          value={substring}
          placeholder='Начните вводить ...'
          onChange={handleInputChange}
        />
        <Filters/>
      </form>
      <UserList/>
    </main>
  )
}