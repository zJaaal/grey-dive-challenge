import { FormControl, FormHelperText, SxProps, TextField, Typography } from "@mui/material";
import React, { RefObject, useContext, useState } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { TextInputProps } from "./types";

const TextInput = React.forwardRef<RefObject<HTMLInputElement>, TextInputProps>((props, ref) => {
  const { handleFormValueChange } = useContext(ValidationContext);
  const [error, setError] = useState<string | null>(null);

  let handleTextChange = (value: string) => {
    if (value.length == 1 && value == " ") value = value.trim();

    let { isValid, errorMessage } = handleFormValueChange(props.name!, value);

    if (!isValid) setError(errorMessage!);
    else setError(null);
  };

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
      <TextField
        inputRef={ref}
        {...props}
        onChange={(e) => handleTextChange(e.target.value)}
        label=""
        sx={inputStyle}
      />
      <FormHelperText sx={{ color: "red", marginTop: "10px" }}>{error || ""}</FormHelperText>
    </FormControl>
  );
});

export default TextInput;
