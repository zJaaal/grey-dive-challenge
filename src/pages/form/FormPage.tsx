import { Grid } from "@mui/material";
import { useState } from "react";
import ItemContainer from "./components/items/ItemContainer";
import WelcomeCard from "./components/welcome/WelcomeCard";
import { InputComponents } from "./utils";
const FormPage = () => {
  const [pointer, setPointer] = useState(-1);

  const increment = () => {
    setPointer((prev) => ++prev);
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
        background:
          "linear-gradient(to right, #4A00E0, #8E2DE2)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
    >
      {pointer < 0 && <WelcomeCard callback={increment} />}
      {pointer >= 0 && (
        <ItemContainer pointer={pointer} decrement={decrement} increment={increment} />
      )}
    </Grid>
  );
};

export default FormPage;
