export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function turnToOddNumber(value: number): number {
  return value % 2 === 0 ? value + 1 : value;
}

export function getRandomOddNumber(min: number, max: number): number {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num % 2 === 0 ? num + 1 : num;
}

export function getNumberFromString(value: string): number {
  return isNaN(parseInt(value)) ? 0 : parseInt(value);
}