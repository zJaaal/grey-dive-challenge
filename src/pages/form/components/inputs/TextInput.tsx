import { FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import React, { RefObject, useContext } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { responsiveTypography } from "../../../../theme/mainTheme";
import { formStyle, inputStyle } from "./sxProps";
import { TextInputProps } from "./types";

/**
 * @description This components creates a custom text input that accepts all needed props and also exposes a ref
 */
const TextInput = React.forwardRef<RefObject<HTMLInputElement>, TextInputProps>((props, ref) => {
  const { handleFormValueChange, formErrors } = useContext(ValidationContext);

  let handleTextChange = (value: string) => {
    if (value.length == 1 && value == " ") value = value.trim();

    handleFormValueChange!(props.name!, value);
  };

  return (
    <FormControl {...props} sx={{ ...formStyle, marginBottom: "20px" }}>
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
        {formErrors[props.name!]}
      </FormHelperText>
    </FormControl>
  );
});

export default TextInput;
