import jsonData from "./db.json";

//Terms and conditions is the end of the form. So the one before is the last item
const lastItemIndex = jsonData.items.findIndex((item) => item.name == "terms_and_conditions") - 1;

//The last component with lastItem and checkboxes, not submit
export const lastComponent: DataType = jsonData.items.slice(
  lastItemIndex,
  jsonData.items.length - 1
);

export const data: DataType = jsonData.items.slice(0, lastItemIndex);
export const rawData: DataType = jsonData.items;

export const submitData = rawData[rawData.length - 1];
export type DataType = (InputType | SelectType)[];
export type InputType = {
  name?: string;
  label?: string;
  type?: string;
  required?: boolean;
};

export interface SelectType extends InputType {
  options?: Options[];
}

type Options = {
  value: string;
  label: string;
};
