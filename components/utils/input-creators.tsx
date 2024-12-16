import mainStyles from '@/app/page.module.css';
import { memo } from 'react';

interface NumberInputProps {
  label: string;
  id: string;
  min: number;
  max: number;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  invalidElements: string[];
  setInvalidElements: React.Dispatch<React.SetStateAction<string[]>>;
  divData?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  id,
  min,
  max,
  value,
  setValue,
  invalidElements,
  setInvalidElements,
  divData,
}) => {
  return (
    <div className={divData}>
      <label htmlFor={id}>{label}</label>
      <input
        className={`
          ${invalidElements.includes(id) ? mainStyles.invalid : ''}
          ${value == '' ? mainStyles.emptyInput : mainStyles.input}
          `}
        type="number"
        id={id}
        placeholder={`${min}-${max}`}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          validateElement({
            value: parseInt(newValue),
            min,
            max,
            elementId: id,
            setInvalidElements,
            invalidElements,
          });
        }}
      />
    </div>
  );
};

function validateElement({
  value,
  min,
  max,
  elementId,
  setInvalidElements,
  invalidElements,
}: {
  value: number;
  min: number;
  max: number;
  elementId: string;
  setInvalidElements: React.Dispatch<React.SetStateAction<string[]>>;
  invalidElements: string[];
}): void {
  if (value < min || value > max) {
    if (!invalidElements.includes(elementId)) {
      setInvalidElements([...invalidElements, elementId]);
    }
  } else {
    setInvalidElements(invalidElements.filter((id) => id !== elementId));
  }
}

export const MemoizedNumberInput = memo(NumberInput);
