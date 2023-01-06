import { FormControl, FormHelperText, SxProps, TextField, Typography } from "@mui/material";
import React, { RefObject, useContext, useState } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { responsiveTypography } from "../../../../theme/mainTheme";
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
    width: "100%",
    fontColor: "white",
  };

  let formStyle: SxProps = {
    width: "100%",
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "20px",
  };

  return (
    <FormControl {...props} sx={formStyle}>
      <Typography variant="h5" sx={{ marginBottom: "20px", ...responsiveTypography }} gutterBottom>
        {props.label} <span style={{ color: "red" }}>*</span>
      </Typography>
      <TextField
        inputRef={ref}
        {...props}
        onChange={(e) => handleTextChange(e.target.value)}
        label=""
        sx={inputStyle}
        autoComplete={"off"}
      />
      <FormHelperText sx={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
        {error || ""}
      </FormHelperText>
    </FormControl>
  );
});

export default TextInput;
