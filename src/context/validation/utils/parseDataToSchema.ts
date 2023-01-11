import { DataType, SelectType } from "../../../data";
import * as yup from "yup";

//Parse all data to schema
//Since the data is part of a poll, I'll assume all fields are required
const parseDataToSchema = (data: DataType) => {
  let dataSchemas: any = {};

  data.forEach((item) => {
    let schema;

    //For item.type we create schemas
    switch (item.type) {
      case "text": {
        schema = yup
          .string()
          .required("Este campo es requerido")
          .test("validate letters", "Este campo solo acepta letras", (value) => {
            return new RegExp(/^[A-Z\s]+$/, "gi").test(value!);
          });
        break;
      }
      case "email": {
        schema = yup
          .string()
          .email("Por favor ingresa un email con formato valido")
          .required("Este campo es requerido");
        break;
      }
      case "select": {
        schema = yup
          .string()
          .matches(
            new RegExp((item as SelectType).options?.map((option) => option.value).join("|")!),
            "Por favor selecciona un pais de la lista"
          )
          .required();
        break;
      }
      case "date": {
        schema = yup
          .date()
          .typeError("Este campo es requerido")
          .required("Este campo es requerido")
          .min(new Date("1/1/1900"), "Por favor, ingresa una fecha valida")
          .max(new Date(), "Por favor, ingrese una fecha valida");
        break;
      }
      case "checkbox": {
        schema = yup.boolean();

        if (item.name == "terms_and_conditions")
          schema = schema.isTrue("Por favor, acepte los terminos y condiciones");
        break;
      }
      default:
        return;
    }
    //We set the schema to the schemas object
    if (item.name && schema) dataSchemas[item.name] = schema;
  });

  return dataSchemas;
};

export default parseDataToSchema;
