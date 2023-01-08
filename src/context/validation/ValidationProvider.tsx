import React, { FC, useEffect, useState } from "react";
import { ValidationContext } from "./ValidationContext";
import { rawData } from "../../data";

import { saveOnDatabase } from "../../firebase";
import { formSchemas } from "./utils/formSchemas";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ValidationProvider: FC<any> = ({ children }) => {
  const [formValues, setFormValues] = useState<any>();
  const [formErrors, setFormErrors] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const navigate = useNavigate();

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

  const saveAnswers = async () => {
    let result;
    let keys = Object.keys(formValues);

    keys.forEach((key) => {
      if (moment.isMoment(formValues[key]))
        formValues[key] = formValues[key].toDate().toISOString();
    });

    if (keys.reduce((acc, key) => (acc += Number(validateFormValue(key))), 0) == keys.length) {
      setLoading(true);

      try {
        await saveOnDatabase(formValues);
        let modalResult = await Swal.fire({
          title: "Guardado satisfactoriamente",
          icon: "success",
          showDenyButton: true,
          denyButtonText: "Volver al inicio",
          confirmButtonText: "Ir a las Respuestas",
          confirmButtonColor: "#4A00E0",
        });
        if (modalResult.isConfirmed) {
          navigate("answers");
        }
        initValues();
        result = true;
      } catch (err) {
        Swal.fire({
          title: "Parece que algo salio mal.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
          confirmButtonColor: "#4A00E0",
        });
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
