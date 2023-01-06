import { FormControl, FormHelperText, SxProps, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import * as moment from "moment";
import React, { RefObject, useContext, useState } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { DateInputProps } from "./types";

const DateInput = React.forwardRef<RefObject<HTMLInputElement>, DateInputProps>((props, ref) => {
  const { handleFormValueChange } = useContext(ValidationContext);
  const [error, setError] = useState<string | null>(null);

  let handleDateChange = (value: Moment) => {
    let { isValid, errorMessage } = handleFormValueChange(props.name!, value.toDate());

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
    <DatePicker
      {...props}
      value={props.value}
      onChange={(value) => handleDateChange(value!)}
      maxDate={moment()}
      renderInput={(params) => (
        <FormControl {...props} sx={formStyle}>
          <Typography variant="h5" sx={{ marginBottom: "8.4px" }} gutterBottom>
            {params.label} <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField inputRef={ref} {...params} sx={inputStyle} label="" variant="standard" />
          <FormHelperText sx={{ color: "red", marginTop: "10px" }}>
            {error || ""}
          </FormHelperText>{" "}
        </FormControl>
      )}
    />
  );
});

export default DateInput;
