import { FormControl, FormHelperText, SxProps, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { RefObject, useState } from "react";
import { DateInputProps } from "./types";

const DateInput = React.forwardRef<RefObject<HTMLInputElement>, DateInputProps>((props, ref) => {
  const [value, setValue] = useState(new Date());

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
      value={value}
      onChange={(value) => setValue(value || new Date())}
      renderInput={(params) => (
        <FormControl {...props} sx={formStyle}>
          <Typography variant="h5" sx={{ marginBottom: "8.4px" }} gutterBottom>
            {params.label} <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField inputRef={ref} {...params} sx={inputStyle} label="" variant="standard" />
          <FormHelperText></FormHelperText>
        </FormControl>
      )}
    />
  );
});

export default DateInput;
