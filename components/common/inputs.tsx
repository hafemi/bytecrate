import React, { useState } from 'react';
import mainStyles from '@/app/page.module.css';
import style from '@/components/common/styles.module.css';

interface CheckboxInputProps {
  label: string;
  id: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divData?: string;
}

interface ColorInputProps {
  label: string;
  id: string;
  defaultValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divData?: string;
}

interface NumberInputProps {
  label: string;
  id: string;
  min: number;
  max: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divData?: string;
}

interface RangeInputProps {
  label: string;
  id: string;
  min: number;
  max: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divData?: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = React.memo(function CheckboxInput({
  label,
  id,
  checked,
  setChecked,
  onChange,
  divData,
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (onChange) onChange(e);
  };

  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input type="checkbox" id={id} checked={checked} onChange={handleChange} />
    </div>
  );
});

export const ColorInput: React.FC<ColorInputProps> = React.memo(function ColorInput({
  label,
  id,
  defaultValue,
  setValue,
  onChange,
  divData,
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input className={style.colorInput} type="color" id={id} defaultValue={defaultValue} onBlur={handleChange} />
    </div>
  );
});

export const NumberInput: React.FC<NumberInputProps> = React.memo(function NumberInput({
  label,
  id,
  min,
  max,
  value,
  setValue,
  onChange,
  divData,
}) {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const newValueInt = parseInt(newValue, 10);
    setIsValid(newValue === '' || (newValueInt >= min && newValueInt <= max));
    if (isValid && onChange) {
      onChange(e);
    }
  };

  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input
        className={`
          ${style.numberInput}
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

export const RangeInput: React.FC<RangeInputProps> = React.memo(function RangeInput({
  label,
  id,
  min,
  max,
  value,
  setValue,
  onChange,
  divData,
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input type="range" id={id} min={min} max={max} value={value === '' ? min : value} onChange={handleChange} />
    </div>
  );
});
