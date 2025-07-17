export const getQuestionWordForm = (number: number): string => {
  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${number} вопросов`;
  }
  if (lastDigit === 1) {
    return `${number} вопрос`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number} вопроса`;
  }
  return `${number} вопросов`;
};
