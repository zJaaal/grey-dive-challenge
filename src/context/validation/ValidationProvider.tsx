import React, { FC, useEffect, useRef, useState } from "react";
import { ValidationContext } from "./ValidationContext";
import { data } from "../../data";
import parseDataToSchema from "./utils/parseDataToSchema";
import { ValidateResponse } from "./types";

const ValidationProvider: FC<any> = ({ children }) => {
  const [formValues, setFormValues] = useState<any>();
  const formSchemas = useRef<any>(parseDataToSchema(data));

  const handleFormValueChange = (key: string, value: string | Date | boolean) => {
    let response: ValidateResponse = {
      isValid: true,
    };

    try {
      formSchemas.current[key].validateSync(value);
    } catch (error) {
      response = {
        isValid: false,
        errorMessage: (error as Error).message,
      };
    } finally {
      setFormValues((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    }

    return response;
  };

  useEffect(() => {
    let formValues: any = {};
    data.forEach((item) => {
      formValues[item.name!] = "";

      if (item.type == "date") formValues[item.name!] = null;
      if (item.type == "checkbox") formValues[item.name!] = false;
    });

    setFormValues(formValues);
  }, []);

  return (
    <ValidationContext.Provider value={{ formValues, handleFormValueChange }}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationProvider;
