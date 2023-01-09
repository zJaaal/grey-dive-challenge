import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Box } from "@mui/material";
import React, { RefObject } from "react";
import { boxStyle } from "./sxProps";

/**
 * @description This components creates a custom submit button that accepts all needed props and also exposes a ref
 */
const SubmitInput = React.forwardRef<
  RefObject<HTMLButtonElement>,
  LoadingButtonProps & { label: string } & { callback: () => void }
>((props, ref) => {
  return (
    <Box sx={boxStyle} ref={ref}>
      <LoadingButton
        type="submit"
        variant="contained"
        onClick={props.callback}
        loading={props.loading}
      >
        {props.label}
      </LoadingButton>
    </Box>
  );
});

export default SubmitInput;
