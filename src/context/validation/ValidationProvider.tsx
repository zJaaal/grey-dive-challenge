import React, { FC, useEffect, useState } from "react";
import { ValidationContext } from "./ValidationContext";
import { rawData } from "../../data";

import { saveOnDatabase } from "../../firebase";
import { formSchemas } from "./utils/formSchemas";
import moment, { Moment } from "moment";

const ValidationProvider: FC<any> = ({ children }) => {
  const [formValues, setFormValues] = useState<any>();
  const [formErrors, setFormErrors] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const initValues = () => {
    let formValues: any = {};
    let formErrors: any = {};
    rawData.forEach((item) => {
      if (item.name) {
        formValues[item.name] = "";
        if (item.type == "date") formValues[item.name] = "";
        if (item.type == "checkbox") formValues[item.name] = false;
        formErrors[item.name] = null;
      }
    });

    setFormValues(formValues);
    setFormErrors(formErrors);
  };

  useEffect(() => {
    initValues();
  }, []);

  const validateFormValue = (key: string, value: string | boolean | Date = formValues[key]) => {
    try {
      formSchemas[key].validateSync(value);
      setFormErrors((prev: any) => ({ ...prev, [key]: null }));
      return true;
    } catch (error) {
      setFormErrors((prev: any) => ({ ...prev, [key]: (error as Error).message }));
      return false;
    }
  };

  const handleFormValueChange = (key: string, value: string | Date | boolean) => {
    validateFormValue(key, value);

    setFormValues((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveAnswers = () => {
    let keys = Object.keys(formValues);

    keys.forEach((key) => {
      if (moment.isMoment(formValues[key]))
        formValues[key] = formValues[key].toDate().toISOString();
    });

    if (keys.reduce((acc, key) => (acc += Number(validateFormValue(key))), 0) == keys.length) {
      setLoading(true);
      saveOnDatabase(formValues)
        .then(() => console.log("Saved!"))
        .catch((_) => console.log("Something went wrong"))
        .finally(() => setLoading(false));

      return true;
    } else {
      console.log("Some values are invalid");
      return false;
    }
  };

  return (
    <ValidationContext.Provider
      value={{
        formValues,
        handleFormValueChange,
        saveAnswers,
        validateFormValue,
        formErrors,
        loading,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationProvider;
