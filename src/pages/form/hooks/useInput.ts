import React, { useMemo } from "react";
import { data } from "../../../data";
import { InputComponents } from "../utils";
import { InputProps } from "./type";

const useInput: InputProps = (pointer: number) => {
  const { item, InputComponent } = useMemo(() => {
    let item = pointer >= 0 && pointer < data.length ? data[pointer] : undefined;
    let InputComponent = InputComponents[item?.type || ""];

    return { item, InputComponent };
  }, [pointer]);

  return { item, InputComponent };
};

export default useInput;
