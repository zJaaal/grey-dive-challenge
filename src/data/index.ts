import rawData from "./db.json";

export const data: DataType = rawData.items;

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
