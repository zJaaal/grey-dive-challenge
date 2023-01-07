import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  SxProps,
  Typography,
} from "@mui/material";
import React, { RefObject, SyntheticEvent, useContext, useState } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { CheckboxInputProps } from "./types";

const CheckboxInput = React.forwardRef<RefObject<HTMLInputElement>, CheckboxInputProps>(
  (props, ref) => {
    const { handleFormValueChange, formErrors } = useContext(ValidationContext);

    let handleCheckboxChange = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      handleFormValueChange(props.name!, checked);
    };

    let formStyle: SxProps = {
      width: "100%",
      display: "flex",
      alignItems: "start",
      justifyContent: "center",
      flexDirection: "column",
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
