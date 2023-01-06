import { Grid } from "@mui/material";
import { useContext } from "react";
import { ValidationContext } from "../../context/validation/ValidationContext";
import { data } from "../../data";
import { InputComponents } from "./utils";
const FormPage = () => {
  const { formValues } = useContext(ValidationContext);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {formValues &&
        data.map((item) => {
          //If undefined then we don't show anything so we can just fallback to nothing
          let Input = InputComponents[item.type!];

          return (
            Input && (
              <div key={item.label}>
                <Input {...item} value={formValues[item.name!]} variant="standard" />
              </div>
            )
          );
        })}
    </Grid>
  );
};

export default FormPage;
