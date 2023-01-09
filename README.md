# Requisitos

Realizar una app en React.js que lea el siguiente archivo JSON y genere con cada ítem una interfaz de app de encuesta (como Google Forms).
En cuanto a diseño y estética tiene que diferir de Google Forms. Puedes utilizar cualquier librería que creas necesaria.

Las respuestas de la encuesta deben ser enviadas a una base de datos de Firebase.
Dicha base de datos tiene que ser de su propiedad. No nos compartas acceso a la base de datos.

Por último, traé las respuestas de la base de datos ya mencionada y mostralas en la misma app pero en otra ruta. Al presionar “enviar” en el formulario tiene que aparecer un mensaje y el acceso a esa ruta en donde estarán las respuestas. El diseño y estética queda a libre elección.

# Estrategia

Realizar componentes dinamicos que acepten todo tipo de data (compatible con los Input Types de HTML) para asi generar inputs dedicados a cada item de la data. Ademas, se generaran schemas usando un parser que sea capaz de traducir la data en el JSON a schemas de Yup para manejar las validaciones por medio de un React Context.

# Mejoras Recomendadas

Para los Schemas dinámicos, con un poco más de información acerca de que validaciones se realizaran, planificación y tiempo, se puede crear un parser lo suficientemente robusto y eficiente como para generar schemas de cualquier tipo con cualquier validación necesaria a partir de un objeto JS como el input de este challenge.

Algo como el de este ejemplo:

```js
// example.js puedes correrlo usando node --watch example.js si estas en node 18
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

// Iteramos por los objetos
let formSchemas = {};
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
```

Lo que se imprime en consola es:

- > "Jalinson Diaz" es valido
- > "1234\_" no es valido: ValidationError: Solo puede contener letras
- > "Hola" no es valido: ValidationError: this must be at least 5 characters
- > "Hola 1234" no es valido: ValidationError: Solo puede contener letras
- > "" no es valido: ValidationError: Este campo es requerido
- > "Una string absurdamente larga y claramente mayor a 25 chars" no es valido: ValidationError: this must be at most 25 characters

El context puede ser cambiado por alguna librería que acepte schemas como Formik, en mi caso, por cuestión de tiempo, decidí hacer mi propio handle del formulario desde un context para no perder tiempo en analizar cual sería la mejor forma de implementar Formik en este caso en particular. Aun así, tal vez este mismo contexto puede ser mejorado y así ahorrarse el peso del bundle de una dependencia.

Existe un warning en el date picker por cuestiones de Moment.JS y el objeto Date de JS. No di con la solución hasta este momento, así que se podría cambiar el Adapter a uno más estable como Luxon.

Para mostrar todos los datos se usó DataGrid de Material UI, aunque es un componente poderoso, la visualización en pantallas pequeñas es pobre, por lo tanto, se podría optar por un diseño más mobile friendly en caso de necesitarlo.

Finalmente, en cuanto a diseño opte por hacer algo similar a TypeForm, por lo tanto, si se requiere de hacer un formulario más simple, este codigo se puede simplificar un monton en cuanto a la pagina de formulario y ademas se puede hacer mas reutilizable los componentes inputs, ya que, el diseño no seria tan especifico

# Tecnologias

- React
- TypeScript
- Vite
- HTML
- CSS
- Material UI
- Yup
- React Router
- Firebase/Firestore
- SweetAlert2
