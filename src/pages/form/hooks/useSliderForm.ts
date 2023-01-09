import React, { useState } from "react";
import { SliderFormProps } from "./type";

const useSliderForm: SliderFormProps = (submitCallback: (() => Promise<boolean>) | undefined) => {
  const [pointer, setPointer] = useState(-1);
  const [prev, setPrev] = useState(0);

  //Increment handler that validates if the current input has a valid value before we advance
  const handleIncrement = (
    validateCallback?: (key: string, value?: string | Date | boolean) => boolean,
    key?: string
  ) => {
    if (pointer < 0) setPointer((prev) => ++prev);

    if (pointer >= 0 && validateCallback!(key!))
      setPointer((prev) => {
        setPrev(prev);

        return ++prev;
      });
  };

  //Decrement handler
  const handleDecrement = () => {
    setPointer((prev) => {
      setPrev(prev);

      return --prev;
    });
  };

  //Here we handle the submit and reset the pointer if we want to go the start
  const handleSubmit = () => {
    submitCallback!().then((result: boolean) => {
      if (result) {
        setPointer(-1);
        setPrev(0);
      }
    });
  };
  return {
    pointer,
    prev,
    increment: handleIncrement,
    decrement: handleDecrement,
    submit: handleSubmit,
  };
};

export default useSliderForm;
