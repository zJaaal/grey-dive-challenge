import { FormControl, FormHelperText, MenuItem, Select, SxProps, Typography } from "@mui/material";
import React, { RefObject, useContext, useState } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { SelectInputProps } from "./types";

const SelectCustomInput = React.forwardRef<RefObject<HTMLInputElement>, SelectInputProps>(
  (props, ref) => {
    const { handleFormValueChange } = useContext(ValidationContext);
    const [error, setError] = useState<string | null>(null);

    let handleSelectChange = (value: string) => {
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
        <Select
          value={props.value}
          inputRef={ref}
          onChange={(event) => handleSelectChange(event.target.value as string)}
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
        <FormHelperText sx={{ color: "red", marginTop: "10px" }}>{error || ""}</FormHelperText>{" "}
      </FormControl>
    );
  }
);

export default SelectCustomInput;
