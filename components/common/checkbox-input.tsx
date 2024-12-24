import React from 'react';

interface CheckboxInputProps {
  label: string;
  id: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
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
