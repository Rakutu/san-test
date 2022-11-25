import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { debounce } from '../../services/utils/debounce';
import { changeShowUsersBySubstring } from '../../services/store/userSlice';
import { TextField } from '../../Components/TextField';
import { Filters } from '../../Components/Filters';
import { Userlist } from '../../Components/Userlist';


export const Home = () => {
  const dispatch = useDispatch();
  const [ inputValue, setInputValue ] = useState('');
  const handleInputChange = debounce((value) => setInputValue(value));

  useEffect(() => {
    if (!inputValue) return;

    dispatch(changeShowUsersBySubstring({ substring: inputValue }));
  }, [ inputValue ]);

  return (
    <main className='container'>
      <form>
        <TextField
          value={inputValue}
          placeholder='Начните вводить ...'
          onChange={handleInputChange}
        />
        <Filters/>
      </form>
      <Userlist substring={inputValue}/>
    </main>
  )
}