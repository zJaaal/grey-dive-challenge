import { Card, CardContent, CardActions, Button } from "@mui/material";
import React, { FC, useContext } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { data, lastComponent, rawData, submitData } from "../../../../data";
import { InputComponents } from "../../utils";
import { ItemContainerProps } from "./types";

const ItemContainer: FC<ItemContainerProps> = ({ pointer, increment, decrement }) => {
  const { formValues } = useContext(ValidationContext);

  let item = data[pointer];

  let Input = item && InputComponents[item.type || ""];

  return (
    <Card
      className="glass"
      sx={{
        width: { xs: "90%", md: "50%", lg: "50%" },
        height: 300,
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ width: "80%" }}>
        {item && pointer < data.length && (
          <Input {...item} value={formValues[item.name!]} variant="standard" />
        )}
        {pointer == data.length &&
          lastComponent.map((item) => {
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
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        {pointer == data.length && (
          <>
            <Button size="medium" variant="contained" onClick={decrement} disabled={pointer == 0}>
              Atras
            </Button>
            <InputComponents.submit {...submitData} variant="standard" />
          </>
        )}
        {pointer != data.length && (
          <>
            <Button size="medium" variant="contained" onClick={decrement} disabled={pointer == 0}>
              Atras
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={increment}
              disabled={pointer == data.length}
            >
              Continuar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ItemContainer;
