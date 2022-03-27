import React from 'react';

type PropType = {
  name: string;
  value: string;
  currentValue: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: React.FC<PropType> = function ({
  name,
  onChange,
  value,
  currentValue,
}) {
  return (
    <div className="checkbox-container flex-container">
      <input
        onChange={onChange}
        type="radio"
        checked={currentValue === value}
        id={name}
        name={name}
        value={value}
        className="input"
      />
    </div>
  );
};

export default Checkbox;
