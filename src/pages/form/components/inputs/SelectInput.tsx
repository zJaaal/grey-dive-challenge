import { FormControl, FormHelperText, MenuItem, Select, SxProps, Typography } from "@mui/material";
import React, { RefObject, useContext } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";
import { responsiveTypography } from "../../../../theme/mainTheme";
import { formStyle, inputStyle } from "./sxProps";
import { SelectInputProps } from "./types";

/**
 * @description This components creates a custom select that accepts all needed props and also exposes a ref
 */
const SelectCustomInput = React.forwardRef<RefObject<HTMLInputElement>, SelectInputProps>(
  (props, ref) => {
    const { handleFormValueChange, formErrors } = useContext(ValidationContext);

    let handleSelectChange = (value: string) => {
      handleFormValueChange(props.name!, value);
    };
    let inputExtendedStyle: SxProps = {
      ...inputStyle,
      "&:after": { borderColor: "#8E2DE2" },
      "&:focus": { background: "none" },
      "&:active": { background: "none" },
    };

    return (
      <FormControl {...props} sx={{ ...formStyle, marginBottom: "20px" }}>
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
          sx={inputExtendedStyle}
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
