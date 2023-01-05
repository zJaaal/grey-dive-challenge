import React, { useRef } from "react";
import data from "../../../public/db.json";
import TextInput from "./components/inputs/TextInput";
const FormPage = () => {
  return (
    <div>
      <TextInput variant="standard" />
      {data.items.map((item) => (
        <div key={item.label}>
          <div>{item.type}</div>
          <div>{item.label}</div>
          <div>{item.name}</div>
          <div>{item.required}</div>
          {item.options &&
            item.options.map((item, j) => (
              <div key={j}>
                <div>{item.label}</div> <div>{item.value}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default FormPage;
