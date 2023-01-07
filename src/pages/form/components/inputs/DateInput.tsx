import { FormControl, FormHelperText, SxProps, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Moment } from "moment";
import moment from "moment";
import { LocalizationProvider, esES } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/es";

import React, { RefObject, useContext, useState } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { DateInputProps } from "./types";
import { responsiveTypography } from "../../../../theme/mainTheme";

const DateInput = React.forwardRef<RefObject<HTMLInputElement>, DateInputProps>((props, ref) => {
  const { handleFormValueChange, formErrors } = useContext(ValidationContext);

  let handleDateChange = (value: Moment | string) => {
    handleFormValueChange(props.name!, moment.isMoment(value) ? value.toDate() : value);
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
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="es">
      <DatePicker
        {...props}
        onChange={(value) => handleDateChange(value || "")}
        maxDate={moment()}
        renderInput={(params) => (
          <FormControl {...props} sx={formStyle}>
            <Typography
              variant="h5"
              sx={{ marginBottom: "20px", ...responsiveTypography }}
              gutterBottom
            >
              {params.label} <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField inputRef={ref} {...params} sx={inputStyle} label="" variant="standard" />
            <FormHelperText sx={{ color: "red", marginTop: "10px" }}>
              {formErrors[props.name!]}
            </FormHelperText>{" "}
          </FormControl>
        )}
      />
    </LocalizationProvider>
  );
});

export default DateInput;
