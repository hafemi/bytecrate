import { PWGenStrengthColor } from '@/lib/constants/tools';

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

export function updateStrengthColor(password: string): void {
  const colorBlock = document.getElementById('passwordSlider');
  const textBlock = document.getElementById('strengthText');
  if (!colorBlock || !textBlock) return;
  const score = getStrengthScore(password);
  const text = getStrengthText(score);
  const color = PWGenStrengthColor[score];

  colorBlock.style.backgroundColor = color;
  textBlock.innerText = text;
  textBlock.style.color = color;
}

function getStrengthScore(password: string): number {
  let score = 0;

  if (password.length < 8) return 0;

  if (password.match(/[a-z]/)) score += 1;

  if (password.match(/[A-Z]/)) score += 1;

  if (password.match(/[0-9]/)) score += 1;

  if (password.match(/[!@#$%^&*()_+[]{}?]/)) score += 1;
  
  // mark it as weak if it doesn't have much complexity
  if (score <= 2) return score

  score += Math.floor(password.length / 15);

  return score >= 4 ? 4 : score;
}

function getStrengthText(score: number): string {
  switch (score) {
    case 0:
      return 'Weak';
    case 1:
      return 'Fair';
    case 2:
      return 'Okay';
    case 3:
      return 'Good';
    case 4:
      return 'Strong';
    default:
      return 'Unknown';
  }
}
