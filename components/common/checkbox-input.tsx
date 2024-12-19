import React from 'react';

interface CheckboxInputProps {
  label: string;
  id: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  divData?: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = React.memo(function CheckboxInput({
  label,
  id,
  checked,
  setChecked,
  divData,
}) {
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input type="checkbox" id={id} checked={checked} onChange={handleChange} />
    </div>
  );
});
