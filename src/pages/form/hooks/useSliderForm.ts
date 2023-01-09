import React, { useContext, useState } from "react";
import { ValidationContext } from "../../../context/validation/ValidationContext";
import { SliderFormProps } from "./type";

const useSliderForm: SliderFormProps = (submitCallback: () => Promise<boolean>) => {
  const { validateFormValue } = useContext(ValidationContext);
  const [pointer, setPointer] = useState(-1);
  const [prev, setPrev] = useState(0);

  //Increment handler that validates if the current input has a valid value before we advance
  const handleIncrement = (validateCallback?: (key?: string) => boolean, key?: string) => {
    if (pointer < 0) setPointer((prev) => ++prev);

    if (pointer >= 0 && validateCallback!(key))
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
    submitCallback().then((result: boolean) => {
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
