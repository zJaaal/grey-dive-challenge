import { Checkbox, FormControl, FormControlLabel, FormHelperText, Typography } from "@mui/material";
import React, { RefObject, SyntheticEvent, useContext, useState } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { formStyle } from "./sxProps";
import { CheckboxInputProps } from "./types";

/**
 * @description This components creates a custom checkbox that accepts all needed props and also exposes a ref
 */
const CheckboxInput = React.forwardRef<RefObject<HTMLInputElement>, CheckboxInputProps>(
  (props, ref) => {
    const { handleFormValueChange, formErrors } = useContext(ValidationContext);

    let handleCheckboxChange = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      handleFormValueChange!(props.name!, checked);
    };

    return (
      <FormControl {...props} sx={formStyle}>
        <FormControlLabel
          inputRef={ref}
          label={
            <Typography variant="body1" fontSize={"14px"}>
              {props.label}
            </Typography>
          }
          onChange={(e, checked) => handleCheckboxChange(e, checked)}
          control={<Checkbox value={props.value} size={"small"} />}
        />
        <FormHelperText sx={{ color: "red" }}>{formErrors[props.name!]}</FormHelperText>
      </FormControl>
    );
  }
);

export default CheckboxInput;
