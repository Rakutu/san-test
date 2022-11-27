import React from 'react';


export const Checkbox = ({ id, checked, label, onChange, ...otherProps }) => {
  const visibleInputClass = checked
    ? 'visibleCheckbox checkboxChecked'
    : 'visibleCheckbox';

  return (
    <div className='checkboxRoot'>
      <input
        {...otherProps}
        id={id}
        type='checkbox'
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