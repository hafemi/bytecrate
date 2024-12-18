import mainStyles from '@/app/page.module.css';
import React, { useState } from 'react';

interface NumberInputProps {
  label: string;
  id: string;
  min: number;
  max: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  divData?: string;
}

interface ColorInputProps {
  label: string;
  id: string;
  defaultValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  divData?: string;
}

export const NumberInput: React.FC<NumberInputProps> = React.memo(function NumberInput({
  label,
  id,
  min,
  max,
  value,
  setValue,
  divData,
}) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const newValueInt = parseInt(newValue, 10);
    setIsValid(newValue === '' || (newValueInt >= min && newValueInt <= max));
  };

  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input
        className={`
          ${!isValid ? mainStyles.invalid : ''}
          ${value === '' ? mainStyles.emptyInput : mainStyles.input}
        `}
        type="number"
        id={id}
        placeholder={`${min}-${max}`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
});

export const ColorInput: React.FC<ColorInputProps> = React.memo(function ColorInput({
  label,
  id,
  defaultValue,
  setValue,
  divData,
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input type="color" id={id} defaultValue={defaultValue} onBlur={handleChange} />
    </div>
  );
});
