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

  //FormPage states
  const [pointer, setPointer] = useState(-1);
  const [item, setItem] = useState<InputType | SelectType>();
  const [Input, setInput] = useState<any>();
  const [prev, setPrev] = useState(0);

  //When pointer changes we get the item from the data
  useEffect(() => {
    if (pointer >= 0 && pointer < data.length) setItem(data[pointer]);
  }, [pointer]);

  //Then when the item changes whe get the input from the InputComponents Object
  useEffect(() => {
    setInput(InputComponents[item?.type || ""]);
  }, [item]);

  //Increment handler that validates if the current input has a valid value before we advance
  const handleIncrement = () => {
    if (pointer < 0) setPointer((prev) => ++prev);

    if (pointer >= 0 && validateFormValue(item?.name))
      setPointer((prev) => {
        setPrev(prev);

        return ++prev;
      });
  };

  //Decrement handler
  const handleDecrement = () => {
    setPointer((prev) => {
      setPrev(prev);

      return --prev;
    });
  };

  //Here we handle the submit and reset the pointer if we want to go the start
  const handleSubmit = () => {
    saveAnswers().then((result: boolean) => {
      if (result) {
        setPointer(-1);
        setPrev(0);
      }
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
      {/* Progress Bar */}
      {pointer >= 0 && (
        <ProgressBar
          value={pointer + 1}
          prev={pointer == 0 && prev == 0 ? 0 : prev + 1}
          max={data.length + 1}
        />
      )}

      {/* Welcome Card */}
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
          <WelcomeCard callback={handleIncrement} />
        </FadeIn>
      )}

      {/* Here we show the current input */}
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
              <Button size="medium" variant="outlined" onClick={handleDecrement}>
                Atras
              </Button>
              <Button size="medium" variant="contained" onClick={handleIncrement}>
                Continuar
              </Button>
            </FadeIn>
          )}
        />
      )}
      {/* When we get to the last component
      we show
      the last important item,
      the checkboxes (if there are more than the terms and conditions)
      and the submit button
      */}
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
                <Button size="medium" variant="outlined" onClick={handleDecrement}>
                  Atras
                </Button>
                <Submit
                  {...submitData}
                  size="medium"
                  variant="contained"
                  callback={handleSubmit}
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
