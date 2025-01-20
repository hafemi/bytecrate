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

  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+[\]{}?]/.test(password)) score++;
  
  if (score <= 2 && password.length < 16) return 0; // mark as weak if not much complexity/length
  if (score == 4 && password.length < 16) return 3; // mark as good if not long enough
  if (password.length >= 64) {
    if (score == 4 || score == 3 && password.length >= 80) return 5; // mark as excellent if complex & long or strong and very long
    if (score == 3) return 4; // mark as strong if long enough
  }

  return score
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
    case 5:
      return 'Excellent';
    default:
      return 'Unknown';
  }
}
