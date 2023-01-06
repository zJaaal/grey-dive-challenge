import { FormControl, FormHelperText, MenuItem, Select, SxProps, Typography } from "@mui/material";
import React, { RefObject, useState } from "react";
import { SelectInputProps } from "./types";

const SelectCustomInput = React.forwardRef<RefObject<HTMLInputElement>, SelectInputProps>(
  (props, ref) => {
    const [value, setValue] = useState("");

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
        <Select
          value={value}
          inputRef={ref}
          onChange={(event) => setValue(event.target.value as string)}
          sx={inputStyle}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "100px",
              },
            },
          }}
        >
          {props.options.map(({ value, label }) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    );
  }
);

export default SelectCustomInput;
