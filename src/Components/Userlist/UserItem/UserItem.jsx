import React from 'react';
import { dateFormatter, yearFormatter } from '../../../services/utils/dateFormats';
import './userItem.styles.css';


export const UserItem = ({ user }) => {
  const userName = `${user.name.first} ${user.name.last}`;

  return (
    <li className='userItem'>
      <img
        className='userAvatar'
        src={user.picture.large}
        alt={`${userName} avatar`}
      />
      <div>
        <p className='userName'>{userName}</p>
        <div>
          <span className='userPropName'>Возраст: </span>
          <span className='userProp'>{yearFormatter.format(user.dob.age)}</span>
        </div>
        <div>
          <span className='userPropName'>Пол: </span>
          <span className='userProp'>{user.gender}</span>
        </div>
        <div>
          <span className='userPropName'>Адрес: </span>
          <span className='userProp'>{user.location.country}, {user.location.city}</span>
        </div>
        <div>
          <span className='userPropName'>Дата регистрации: </span>
          <span className='userProp'>{dateFormatter(user.registered.date)}</span>
        </div>
      </div>
    </li>
  )
}