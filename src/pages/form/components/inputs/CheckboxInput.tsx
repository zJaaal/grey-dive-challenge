import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  SxProps,
  Typography,
} from "@mui/material";
import React, { RefObject } from "react";
import { CheckboxInputProps } from "./types";

const CheckboxInput = React.forwardRef<RefObject<HTMLInputElement>, CheckboxInputProps>(
  (props, ref) => {
    let formStyle: SxProps = {
      width: "50vw",
      display: "flex",
      alignContent: "left",
      flexWrap: "wrap",
      marginBottom: "40px",
    };

    return (
      <FormControl {...props} sx={formStyle}>
        <FormControlLabel
          inputRef={ref}
          label={
            <Typography variant="body1" fontSize={"18px"}>
              {props.label}
            </Typography>
          }
          control={<Checkbox />}
        />
        <FormHelperText></FormHelperText>
      </FormControl>
    );
  }
);

export default CheckboxInput;
