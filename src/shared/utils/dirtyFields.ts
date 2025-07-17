import { FieldValues } from "react-hook-form";

export const filterChangedFormFields = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<Record<keyof T, boolean>>,
): Partial<T> => {
  const changedFieldValues = Object.keys(dirtyFields).reduce(
    (acc, currentField) => {
      return {
        ...acc,
        [currentField]: allFields[currentField],
      };
    },
    {} as Partial<T>,
  );

  return changedFieldValues;
};

export const getChangedFormFieldsDeep = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<Record<keyof T, boolean | Record<string, boolean>>>,
): Partial<T> =>
  Object.keys(dirtyFields).reduce((acc, currentField) => {
    if (typeof dirtyFields[currentField] === "boolean") {
      return {
        ...acc,
        [currentField]: allFields[currentField],
      };
    }
    return {
      ...acc,
      [currentField]: filterChangedFormFields(
        allFields[currentField],
        dirtyFields[currentField] as Partial<FieldValues>,
      ),
    };
  }, {} as Partial<T>);
