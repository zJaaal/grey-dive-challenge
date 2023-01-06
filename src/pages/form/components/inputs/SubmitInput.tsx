import {
  Button,
  ButtonProps,
  FormControl,
  FormHelperText,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import React, { RefObject } from "react";
// import { SubmitInputProps } from "./types";

const SubmitInput = React.forwardRef<RefObject<HTMLButtonElement>, ButtonProps & { label: string }>(
  (props, ref) => {
    let inputStyle: SxProps = {
      height: "24px",
      width: "50%",
    };

    let formStyle: SxProps = {
      width: "50vw",
      display: "flex",
      alignContent: "end",
      flexWrap: "wrap",
      marginBottom: "40px",
    };

    return (
      <FormControl sx={formStyle}>
        <Button type="submit" variant="contained">
          {props.label}
        </Button>
      </FormControl>
    );
  }
);

export default SubmitInput;
