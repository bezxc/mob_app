export const getFormattedPhoneNumber = (cleanedPhone: string) => {
  const truncated = cleanedPhone.slice(0, 10);

  let formattedPhoneNumber = "";

  if (truncated.length > 0) {
    formattedPhoneNumber += truncated.slice(0, 3);
  }
  if (truncated.length > 3) {
    formattedPhoneNumber += " " + truncated.slice(3, 6);
  }
  if (truncated.length > 6) {
    formattedPhoneNumber += " " + truncated.slice(6, 8);
  }
  if (truncated.length > 8) {
    formattedPhoneNumber += " " + truncated.slice(8, 10);
  }

  return formattedPhoneNumber;
};

export const formatPhoneNumber = ({
  text,
  fromResponse = false,
}: {
  text: string;
  fromResponse?: boolean;
}) => {
  let cleaned = text.replace(/\D/g, "");

  if (fromResponse && (cleaned.startsWith("7") || cleaned.startsWith("8"))) {
    cleaned = cleaned.slice(1);
  }

  const formattedPhoneNumber = getFormattedPhoneNumber(cleaned);

  return formattedPhoneNumber;
};
