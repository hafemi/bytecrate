import React from 'react';

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
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value === '' ? min : value}
        onChange={handleChange}
      />
    </div>
  );
});