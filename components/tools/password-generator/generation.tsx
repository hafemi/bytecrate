export function generatePassword({
  useUppercase,
  useLowercase,
  useNumbers,
  useSpecialCharacters,
  passwordLength,
}: {
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSpecialCharacters: boolean;
  passwordLength: string;
}): string {
  let charset = '';
  if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (useNumbers) charset += '0123456789';
  if (useSpecialCharacters) charset += '!@#$%^&*()_+[]{}?';

  let password = '';
  for (let i = 0; i < parseInt(passwordLength, 10); i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}

export function validateBoxes({
  useUppercase,
  useLowercase,
  useNumbers,
  useSpecialCharacters,
  setUseUppercase,
}: {
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSpecialCharacters: boolean;
  setUseUppercase: React.Dispatch<React.SetStateAction<boolean>>;
}): void {
  if (useUppercase || useLowercase || useNumbers || useSpecialCharacters) {
    return;
  }

  setUseUppercase(true);
}
