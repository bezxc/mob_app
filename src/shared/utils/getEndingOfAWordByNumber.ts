export function getEndingOfAWordByYear(year: number) {
  const words = ["год", "года", "лет"];
  const lastDigit = year % 10;

  let wordIndex;
  if (lastDigit === 1) {
    wordIndex = 0;
  } else if (lastDigit >= 2 && lastDigit <= 4 && (year < 10 || year > 20)) {
    wordIndex = 1;
  } else {
    wordIndex = 2;
  }

  return `${year} ${words[wordIndex]}`;
}
export function getEndingOfAWordByMounth(mounth: number) {
  const words = ["месяц", "месяца", "месяцев"];
  const lastDigit = mounth % 10;

  let wordIndex;
  if (lastDigit === 1 && mounth !== 11) {
    wordIndex = 0;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    wordIndex = 1;
  } else {
    wordIndex = 2;
  }

  return `${mounth} ${words[wordIndex]}`;
}
