import { FormControl, FormHelperText, SxProps, TextField, Typography } from "@mui/material";
import React, { RefObject } from "react";
import { TextInputProps } from "./types";

const TextInput = React.forwardRef<RefObject<HTMLInputElement>, TextInputProps>((props, ref) => {
  let inputStyle: SxProps = {
    height: "24px",
    width: "50%",
  };

  let formStyle: SxProps = {
    width: "100vw",
    display: "flex",
    alignContent: "center",
    flexWrap: "wrap",
    marginBottom: "40px",
  };

  return (
    <FormControl {...props} sx={formStyle}>
      <Typography variant="h5" gutterBottom>
        {props.label} <span style={{ color: "red" }}>*</span>
      </Typography>
      <TextField inputRef={ref} {...props} label="" sx={inputStyle} />
      <FormHelperText></FormHelperText>
    </FormControl>
  );
});

export default TextInput;
