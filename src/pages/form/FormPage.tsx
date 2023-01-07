import { Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ValidationContext } from "../../context/validation/ValidationContext";
import { data, InputType, lastComponent, SelectType, submitData } from "../../data";
import ItemContainer from "./components/items/ItemContainer";
import WelcomeCard from "./components/welcome/WelcomeCard";
import { InputComponents } from "./utils";
const FormPage = () => {
  const { formValues, validateFormValue, formErrors } = useContext(ValidationContext);

  const [pointer, setPointer] = useState(-1);
  const [item, setItem] = useState<InputType | SelectType>();
  const [Input, setInput] = useState<any>();

  useEffect(() => {
    if (pointer > 0) setPointer(-1);
  }, []);

  useEffect(() => {
    if (pointer >= 0 && pointer < data.length) setItem(data[pointer]);
  }, [pointer]);

  useEffect(() => {
    setInput(InputComponents[item?.type || ""]);
  }, [item]);

  const increment = () => {
    if (pointer < 0) setPointer((prev) => ++prev);

    if (pointer >= 0 && validateFormValue(item?.name)) setPointer((prev) => ++prev);
  };
  const decrement = () => {
    setPointer((prev) => --prev);
  };

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      className="background"
    >
      {pointer < 0 && <WelcomeCard callback={increment} />}
      {pointer >= 0 && Input && pointer != data.length && (
        <ItemContainer
          Item={() => <Input {...item} value={formValues[item?.name!]} variant="standard" />}
          Action={() => (
            <>
              <Button size="medium" variant="outlined" onClick={decrement}>
                Atras
              </Button>
              <Button size="medium" variant="contained" onClick={increment}>
                Continuar
              </Button>
            </>
          )}
        />
      )}
      {pointer == data.length && (
        <ItemContainer
          Item={() => (
            <>
              {lastComponent.map((item) => {
                let Input = InputComponents[item.type!];

                return (
                  Input && (
                    <Input
                      {...item}
                      value={formValues[item.name!]}
                      variant="standard"
                      key={item.name}
                    />
                  )
                );
              })}
            </>
          )}
          Action={() => {
            let Submit = InputComponents.submit;

            return (
              <>
                <Button size="medium" variant="outlined" onClick={decrement}>
                  Atras
                </Button>
                <Submit {...submitData} size="medium" variant="contained" />
              </>
            );
          }}
        />
      )}
    </Grid>
  );
};

export default FormPage;
