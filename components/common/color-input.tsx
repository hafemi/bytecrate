import React from 'react';
import style from '@/components/common/styles.module.css';

interface ColorInputProps {
  label: string;
  id: string;
  defaultValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  divData?: string;
}

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
      <input className={style.colorInput} type="color" id={id} defaultValue={defaultValue} onBlur={handleChange} />
    </div>
  );
});
