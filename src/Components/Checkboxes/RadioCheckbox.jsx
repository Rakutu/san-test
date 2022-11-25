import React from 'react';
import './checkboxes.styles.css';


export const RadioCheckbox = ({ id, checked, label, onChange, ...rest }) => {
  const visibleInputClass = checked
    ? 'visibleRadio radioChecked'
    : 'visibleRadio';

  return (
    <div className='checkboxRoot'>
      <input
        {...rest}
        id={id}
        type='radio'
        className='invisibleInput'
        checked={checked}
        onChange={({ target: { value } }) => onChange(value)}
      />
      <label htmlFor={id} className='labelContainer'>
        <div className={visibleInputClass}></div>
        <span className='checkBoxLabel'>{label}</span>
      </label>
    </div>
  )
}