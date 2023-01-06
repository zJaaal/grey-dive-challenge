import React, { FC, useEffect, useRef, useState } from "react";
import { ValidationContext } from "./ValidationContext";
import { rawData } from "../../data";

import { ValidateResponse } from "./types";
import { saveOnDatabase } from "../../firebase";
import { formSchemas } from "./utils/formSchemas";

const ValidationProvider: FC<any> = ({ children }) => {
  const [formValues, setFormValues] = useState<any>();

  const validateFormValue = (key: string, value: string | Date | boolean): ValidateResponse => {
    let response: ValidateResponse = {
      isValid: true,
    };

    try {
      formSchemas[key].validateSync(value);
    } catch (error) {
      response = {
        isValid: false,
        errorMessage: (error as Error).message,
      };
    }
    return response;
  };

  const handleFormValueChange = (key: string, value: string | Date | boolean): ValidateResponse => {
    let response = validateFormValue(key, value);

    setFormValues((prev: any) => ({
      ...prev,
      [key]: value,
    }));

    return response;
  };

  const saveAnswers = () => {
    if (Object.keys(formValues).every((key) => validateFormValue(key, formValues[key]).isValid)) {
      saveOnDatabase(formValues)
        .then((uid) => localStorage.setItem("uid", uid))
        .catch((_) => console.log("Something went wrong"));

      return true;
    } else {
      console.log("Some values are invalid");
      return false;
    }
  };

  useEffect(() => {
    let formValues: any = {};
    rawData.forEach((item) => {
      if (item.name) {
        formValues[item.name] = "";
        if (item.type == "date") formValues[item.name] = null;
        if (item.type == "checkbox") formValues[item.name] = false;
      }
    });

    setFormValues(formValues);
  }, []);

  return (
    <ValidationContext.Provider value={{ formValues, handleFormValueChange, saveAnswers }}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationProvider;
