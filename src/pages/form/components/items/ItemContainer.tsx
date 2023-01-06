import { Card, CardContent, CardActions, Button } from "@mui/material";
import React, { FC, useContext } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { data } from "../../../../data";
import { InputComponents } from "../../utils";
import { ItemContainerProps } from "./types";

const ItemContainer: FC<ItemContainerProps> = ({ pointer, increment, decrement }) => {
  const { formValues } = useContext(ValidationContext);

  let item = data[pointer];

  let Input = InputComponents[item.type || ""];

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
        {item && <Input {...item} value={formValues[item.name!]} variant="standard" />}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "inherit",
        }}
      >
        <Button size="medium" variant="contained" onClick={decrement} disabled={pointer == 0}>
          Atras
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={increment}
          disabled={pointer == data.length - 1}
        >
          Continuar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemContainer;
