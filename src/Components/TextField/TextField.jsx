import React, { useEffect, useState } from 'react';
import './textField.styles.css';


export const TextField = ({ value, placeholder, onChange  }) => {
  const [ inputValue, setInputValue ] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [ value ]);

  const handleChange = (value) => {
    setInputValue(value);
    onChange(value);
  }

  return (
    <input
      value={inputValue}
      placeholder={placeholder}
      className='textField'
      onChange={({ target: { value } }) => handleChange(value)}
    />
  )
}