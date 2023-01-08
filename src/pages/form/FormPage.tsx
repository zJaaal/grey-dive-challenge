import { Button, Grid } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ValidationContext } from "../../context/validation/ValidationContext";
import { data, InputType, lastComponent, SelectType, submitData } from "../../data";
import FadeIn from "./components/animate/FadeIn";
import ItemContainer from "./components/items/ItemContainer";
import ProgressBar from "./components/progress/ProgressBar";
import WelcomeCard from "./components/welcome/WelcomeCard";
import { InputComponents } from "./utils";
const FormPage = () => {
  const { formValues, validateFormValue, loading, saveAnswers } = useContext(ValidationContext);

  const [pointer, setPointer] = useState(-1);
  const [item, setItem] = useState<InputType | SelectType>();
  const [Input, setInput] = useState<any>();
  const [prev, setPrev] = useState(0);

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

    if (pointer >= 0 && validateFormValue(item?.name))
      setPointer((prev) => {
        setPrev(prev);

        return ++prev;
      });
  };
  const decrement = () => {
    setPointer((prev) => {
      setPrev(prev);

      return --prev;
    });
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
      {pointer >= 0 && (
        <ProgressBar
          value={pointer + 1}
          prev={pointer == 0 && prev == 0 ? 0 : prev + 1}
          max={data.length + 1}
        />
      )}
      {pointer < 0 && (
        <FadeIn
          keyTrigger={pointer}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WelcomeCard callback={increment} />
        </FadeIn>
      )}
      {pointer >= 0 && Input && pointer != data.length && (
        <ItemContainer
          Item={() => (
            <FadeIn
              keyTrigger={pointer}
              style={{
                width: "100%",
              }}
            >
              <Input {...item} value={formValues[item?.name!]} variant="standard" />
            </FadeIn>
          )}
          Action={() => (
            <FadeIn
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button size="medium" variant="outlined" onClick={decrement}>
                Atras
              </Button>
              <Button size="medium" variant="contained" onClick={increment}>
                Continuar
              </Button>
            </FadeIn>
          )}
        />
      )}
      {pointer == data.length && (
        <ItemContainer
          Item={() => (
            <FadeIn
              keyTrigger={pointer}
              style={{
                width: "100%",
              }}
            >
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
            </FadeIn>
          )}
          Action={() => {
            let Submit = InputComponents.submit;

            return (
              <>
                <Button size="medium" variant="outlined" onClick={decrement}>
                  Atras
                </Button>
                <Submit
                  {...submitData}
                  size="medium"
                  variant="contained"
                  callback={saveAnswers}
                  loading={loading}
                />
              </>
            );
          }}
        />
      )}
    </Grid>
  );
};

export default FormPage;
