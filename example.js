import * as yup from "yup";
//Tenemos este item de ejemplo
let items = [
  {
    type: "text",
    label: "Nombre completo",
    name: "full_name",
    required: true,
    min: 5,
    max: 25,
    regex: { message: "Solo puede contener letras", constrain: "^[A-Z\\s]+$", flags: "gi" },
  },
];

//Lo que es posible validar
let stringValidations = ["min", "max", "regex", "required"];

//Objeto para almacenar los schemas
let formSchemas = {};

// Iteramos por los objetos
items.forEach((item) => {
  let schema;

  switch (item.type) {
    //Text o string tambien podria ser
    case "text": {
      //Inicializamos el schema
      schema = yup.string();

      //Obtenemos las validaciones requeridas para este item
      let validations = Object.keys(item).filter((key) => stringValidations.includes(key));

      //Creamos el schema dinamicamente
      validations.forEach((key) => {
        //Se podria hacer que todos los campos que son validaciones sean asi:
        // let min = {
        //   constrain: 5,
        //   message: "El campo debe tener al menos 5 caracters",
        // };

        let currentValidation = item[key];

        //Existen dos formas de usar regex en yup, en la que mas confio es usando el metodo test
        if (key == "regex") {
          schema = schema.test("dynamic test", currentValidation.message, (value) =>
            new RegExp(currentValidation.constrain, currentValidation.flags).test(value)
          );
        } else {
          //El ternario es para mostrar el mensaje de es requerido
          //required no acepta ningun valor como restriccion si no que toma el mensaje directamente

          schema = schema[key](key == "required" ? "Este campo es requerido" : currentValidation);
        }
      });
    }
  }
  //Guardamos el schema en el item correspondiente
  formSchemas[item.name] = schema;
});

//Probamos el schema
[
  "Jalinson Diaz",
  "1234_",
  "Hola",
  "Hola 1234",
  "",
  "Una string absurdamente larga y claramente mayor a 25 chars",
].forEach((value) => {
  try {
    formSchemas.full_name.validateSync(value);
    console.log(`"${value}" es valido`);
  } catch (error) {
    console.log(`"${value}" no es valido: ${error}`);
  }
});
