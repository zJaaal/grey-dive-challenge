import { FormControl, TextField } from "@mui/material";
import React, { RefObject } from "react";
import { TextInputProps } from "./types";

const TextInput = React.forwardRef<RefObject<HTMLInputElement>, TextInputProps>((props, ref) => {
  return (
    <FormControl>
      <TextField required inputRef={ref} variant={props.variant} />
    </FormControl>
  );
});

export default TextInput;
