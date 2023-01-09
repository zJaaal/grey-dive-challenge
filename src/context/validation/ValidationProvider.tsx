import React, { FC, useEffect, useState } from "react";
import { ValidationContext } from "./ValidationContext";
import { rawData } from "../../data";

import { saveOnDatabase } from "../../firebase";
import { formSchemas } from "./utils/formSchemas";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ValidationProvider: FC<any> = ({ children }) => {
  //States of the form
  const [formValues, setFormValues] = useState<any>();
  const [formErrors, setFormErrors] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const navigate = useNavigate();

  /**
   * @description This function initialize the state of the form, since I don't know what information is coming,
   *              I cannot make a default object, so this function does that
   */
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

  //Initialize the state on mounting
  useEffect(() => {
    initValues();
  }, []);

  /**
   * @description This function takes a key and a value to validate value the schemas using yup
   * @param key
   * @param value
   * @returns The result of the validation
   */
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

  /**
   * @description This function just handle the changes in the form
   * @param key
   * @param value
   */
  const handleFormValueChange = (key: string, value: string | Date | boolean) => {
    validateFormValue(key, value);

    setFormValues((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * @description This function handles the saving on the database and provides feedback to the user, also it's the entry point of answers route
   * @returns Whether we need to go to the start of the form or not, if not that means something happened with the saving, so we can try to save again
   */
  const saveAnswers = async () => {
    let result;
    let keys = Object.keys(formValues);

    //Transform dates to ISOString
    keys.forEach((key) => {
      if (moment.isMoment(formValues[key]))
        formValues[key] = formValues[key].toDate().toISOString();
    });

    //This reduce sum the state of validation (1 or 0) if they are valid the result should be equal to the keys length
    if (keys.reduce((acc, key) => (acc += Number(validateFormValue(key))), 0) == keys.length) {
      setLoading(true);

      try {
        //Save to database
        await saveOnDatabase(formValues);

        //Shows the modal and waits for the result
        let modalResult = await Swal.fire({
          title: "Guardado satisfactoriamente",
          icon: "success",
          showDenyButton: true,
          denyButtonText: "Volver al inicio",
          confirmButtonText: "Ir a las Respuestas",
          confirmButtonColor: "#4A00E0",
        });

        //If the user chooses to go to answers
        if (modalResult.isConfirmed) {
          navigate("answers");
        }

        //Anyways we reset everything
        initValues();
        //This will trigger a reset on the pointer of the form
        result = true;
      } catch (err) {
        //The save finished with errors
        Swal.fire({
          title: "Parece que algo salio mal.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
          confirmButtonColor: "#4A00E0",
        });
        //We don't move the pointer so the user can try again
        result = false;
      } finally {
        setLoading(false);
      }
    }

    return result;
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
