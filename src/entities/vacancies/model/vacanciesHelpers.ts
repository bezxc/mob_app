export const getVacancySalary = ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  if (from && to && from < to) {
    return `от ${from} до ${to} ₽`;
  }
  if (from) {
    return `от ${from} ₽`;
  }

  if (to) {
    return `до ${to} ₽`;
  }
  return "Не указано";
};

export const prepareListData = (str: string) => {
  return str
    .split(/;\s*[\r|\n]*/)
    .filter((item) => item.length > 0)
    .map((item, index, array) =>
      index === array.length - 1 ? item.trim() : `${item.trim()};`,
    );
};
