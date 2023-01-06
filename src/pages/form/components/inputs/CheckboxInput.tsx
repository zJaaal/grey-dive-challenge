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
    const { handleFormValueChange } = useContext(ValidationContext);
    const [error, setError] = useState<string | null>(null);

    let handleCheckboxChange = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      let { isValid, errorMessage } = handleFormValueChange(props.name!, checked);

      if (!isValid) setError(errorMessage!);
      else setError(null);
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
        <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
      </FormControl>
    );
  }
);

export default CheckboxInput;
