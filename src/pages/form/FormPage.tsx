import { Grid } from "@mui/material";
import data from "../../db.json";
import { InputTypes } from "./utils";
const FormPage = () => {
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
      {data.items.map((item) => {
        let Input = InputTypes[item.type];

        return (
          Input && (
            <div key={item.label}>
              <Input {...item} variant="standard" />
            </div>
          )
        );
      })}
    </Grid>
  );
};

export default FormPage;
