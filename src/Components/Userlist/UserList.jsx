import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../services/store/asyncActions';
import { UserItem } from './UserItem';
import './usersList.styles.css';


export const UserList = () => {
  const dispatch = useDispatch();
  const {
    showUsers,
    status,
    error,
  } = useSelector(({ users }) => users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (status === 'rejected' && error) {
    return (
      <h2>{error}</h2>
    )
  }

  if (status === 'pending') {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <section>
      {showUsers.length > 0 && (
        <ul className='usersList'>
          {showUsers.map(user => <UserItem key={user.email} user={user}/>)}
        </ul>
      )}
    </section>
  )
}