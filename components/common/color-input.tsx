import React from 'react';
import style from '@/components/common/styles.module.css';

interface ColorInputProps {
  label: string;
  id: string;
  defaultValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  divData?: string;
}

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
