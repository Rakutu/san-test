import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeAgeFilter, changeGenderFilter } from '../../services/store/userSlice';
import { Checkbox, RadioCheckbox } from '../Checkboxes';
import './filters.styles.css';


export const Filters = () => {
  const dispatch = useDispatch();
  const {
    ageFilter,
    genderFilter,
  } = useSelector(({ users }) => users);

  const handleChangeGenderFilter = (filter) => {
    dispatch(changeGenderFilter({ genderFilter: filter }));
  };

  const handleChangeAgeFilter = (filter) => {
    dispatch(changeAgeFilter({
      ageFilter: {
        ...ageFilter,
        [filter]: !ageFilter[filter],
      },
    }));
  };

   return (
      <div  className='filtersRoot'>
        <div className='genderRoot'>
          <p className='checkBoxGroupTitle'>Фильтр по полу</p>
          <RadioCheckbox
            id='all'
            checked={genderFilter === 'ALL'}
            label='Все'
            name='gender'
            value='ALL'
            onChange={handleChangeGenderFilter}
          />
          <RadioCheckbox
            id='women'
            checked={genderFilter === 'female'}
            label='Только женщины'
            name='gender'
            value='female'
            onChange={handleChangeGenderFilter}
          />
          <RadioCheckbox
            id='men'
            checked={genderFilter === 'male'}
            label='Только мужчины'
            name='gender'
            value='male'
            onChange={handleChangeGenderFilter}
          />
        </div>
        <div>
          <p className='checkBoxGroupTitle'>Фильтр по возрастным группам</p>
          <div className='ageRoot'>
            <Checkbox
              id='0-18'
              checked={ageFilter['0-18']}
              label='0-18'
              name='age'
              value='0-18'
              onChange={handleChangeAgeFilter}
            />
            <Checkbox
              id='18-35'
              checked={ageFilter['18-35']}
              label='18-35'
              name='age'
              value='18-35'
              onChange={handleChangeAgeFilter}
            />
            <Checkbox
              id='35-65'
              checked={ageFilter['35-65']}
              label='35-65'
              name='age'
              value='35-65'
              onChange={handleChangeAgeFilter}
            />
            <Checkbox
              id='65+'
              checked={ageFilter['65']}
              label='65+'
              name='age'
              value='65'
              onChange={handleChangeAgeFilter}
            />
          </div>
        </div>
      </div>
   )
}