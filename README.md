# Requisitos

Realizar una app en React.js que lea el siguiente archivo JSON y genere con cada ítem una interfaz de app de encuesta (como Google Forms).
En cuanto a diseño y estética tiene que diferir de Google Forms. Puedes utilizar cualquier librería que creas necesaria.

Las respuestas de la encuesta deben ser enviadas a una base de datos de Firebase.
Dicha base de datos tiene que ser de su propiedad. No nos compartas acceso a la base de datos.

Por último, traé las respuestas de la base de datos ya mencionada y mostralas en la misma app pero en otra ruta. Al presionar “enviar” en el formulario tiene que aparecer un mensaje y el acceso a esa ruta en donde estarán las respuestas. El diseño y estética queda a libre elección.

# Estrategia

Realizar componentes dinamicos que acepten todo tipo de data (compatible con los Input Types de HTML) para asi generar inputs dedicados a cada item de la data. Ademas, se generaran schemas de Yup para manejar las validaciones por medio de un React Context.

# Mejoras Recomendadas

Para los Schemas dinamicos, con un poco más de información acerca de que validaciones se realizaran, planificación y tiempo, se puede crear un parser lo suficientemente robusto y eficiente como para generar schemas de cualquier tipo con cualquier validación necesaria apartir de un objeto JS como el input de este challenge.

El context puede ser cambiado por alguna libreria que acepte schemas como Formik, en mi caso, por cuestion de tiempo, decidi hacer mi propio handle del formulario desde un context para no perder tiempo en analizar cual seria la mejor forma de implementar Formik en este caso en particular. Aun así, tal vez este mismo contexto puede ser mejorado y asi ahorrarse el peso del bundle de una dependencia.

Existe un warning en el date picker por cuestiones de Moment.JS y el objeto Date de JS. No di con la solución hasta este momento, asi que se podria cambiar el Adapter a uno mas estable como Luxon.

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
