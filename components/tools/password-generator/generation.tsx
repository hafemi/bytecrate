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

export function getStrengthScoreIndex(password: string): number {
  let index = -1;

  if (password.match(/[a-z]/)) {
    index += 1;
  }

  if (password.match(/[A-Z]/)) {
    index += 1;
  }

  if (password.match(/[0-9]/)) {
    index += 1;
  }

  if (password.match(/[!@#$%^&*()_+[]{}?]/)) {
    index += 1;
  }
  
  index += Math.floor(password.length / 15);

  // Ensure that the password has at least some complexity
  if (index < 4 && password.length > 12) {
    index += 1;
  }
  
  if (index == -1) {
    return 0;
  } else if (index >= 4) {
    return 4
  } else {
    return index
  }
}
