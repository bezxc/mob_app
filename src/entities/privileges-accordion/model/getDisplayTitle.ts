import { PrivilegeCategorySchemaType } from "@/entities/privileges";

export const getDisplayTitle = (
  selectedCategory: number,
  category: PrivilegeCategorySchemaType
) => {
  switch (selectedCategory) {
    case 1:
      return category.first_display;
    case 2:
      return category.second_display;
    case 3:
      return category.third_display;
    case 4:
      return category.fourth_display;
    default:
      return category.title;
  }
};
