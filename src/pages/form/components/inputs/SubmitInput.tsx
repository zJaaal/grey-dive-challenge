import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Box, Button, ButtonProps, SxProps } from "@mui/material";
import React, { RefObject, useContext } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";

const SubmitInput = React.forwardRef<
  RefObject<HTMLButtonElement>,
  LoadingButtonProps & { label: string } & { callback: () => void }
>((props, ref) => {
  let boxStyle: SxProps = {
    width: "inherit",
    display: "flex",
    justifyContent: "end",
  };

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
