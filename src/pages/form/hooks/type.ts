import React from "react";
import { InputType, SelectType } from "../../../data";

export type SliderFormProps = (submitCallback: (() => Promise<boolean>) | undefined) => {
  pointer: number;
  prev: number;
  increment: (
    validateCallback?: (key: string, value?: string | Date | boolean) => boolean,
    key?: string
  ) => void;
  decrement: () => void;
  submit: () => void;
};

export type InputProps = (pointer: number) => {
  item?: InputType | SelectType;
  InputComponent: typeof React.Component;
};
