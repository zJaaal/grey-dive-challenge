import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { ValidationContext } from "../../context/validation/ValidationContext";
import { data, lastComponent, submitData } from "../../data";
import FadeIn from "./components/animate/FadeIn";
import ItemContainer from "./components/items/ItemContainer";
import ProgressBar from "./components/progress/ProgressBar";
import WelcomeCard from "./components/welcome/WelcomeCard";
import useInput from "./hooks/useInput";
import useSliderForm from "./hooks/useSliderForm";
import { InputComponents } from "./utils";
const FormPage = () => {
  const { formValues, loading, saveAnswers, validateFormValue } = useContext(ValidationContext);

  const { pointer, prev, increment, decrement, submit } = useSliderForm(saveAnswers);

  const { item, InputComponent } = useInput(pointer);

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
          <WelcomeCard callback={increment} />
        </FadeIn>
      )}

      {/* Here we show the current input */}
      {pointer >= 0 && InputComponent && pointer != data.length && (
        <ItemContainer
          Item={() => (
            <FadeIn
              keyTrigger={pointer}
              style={{
                width: "100%",
              }}
            >
              <InputComponent {...item} value={formValues[item?.name!]} variant="standard" />
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
              <Button
                size="medium"
                variant="contained"
                onClick={() => increment(validateFormValue, item?.name)}
              >
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
                let InputComponent = InputComponents[item.type!];

                return (
                  InputComponent && (
                    <InputComponent
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
                  callback={submit}
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
