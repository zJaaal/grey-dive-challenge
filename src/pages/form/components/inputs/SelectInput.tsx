import { FormControl, FormHelperText, MenuItem, Select, SxProps, Typography } from "@mui/material";
import React, { RefObject, useContext } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { responsiveTypography } from "../../../../theme/mainTheme";
import { SelectInputProps } from "./types";

const SelectCustomInput = React.forwardRef<RefObject<HTMLInputElement>, SelectInputProps>(
  (props, ref) => {
    const { handleFormValueChange, formErrors } = useContext(ValidationContext);

    let handleSelectChange = (value: string) => {
      handleFormValueChange(props.name!, value);
    };
    let inputStyle: SxProps = {
      height: "24px",
      width: "100%",
      fontColor: "white",
      "&:after": { borderColor: "#8E2DE2" },
      "&:focus": { background: "none" },
      "&:active": { background: "none" },
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
        <Typography
          variant="h5"
          gutterBottom
          sx={{ marginBottom: "20px", ...responsiveTypography }}
        >
          {props.label} <span style={{ color: "red" }}>*</span>
        </Typography>
        <Select
          {...props}
          inputRef={ref}
          onChange={(event) => handleSelectChange(event.target.value as string)}
          sx={inputStyle}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: "100%",
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
        <FormHelperText sx={{ color: "red", marginTop: "10px" }}>
          {formErrors[props.name!]}
        </FormHelperText>{" "}
      </FormControl>
    );
  }
);

export default SelectCustomInput;
