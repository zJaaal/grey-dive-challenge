import { Box, Button, ButtonProps, SxProps } from "@mui/material";
import React, { RefObject } from "react";

const SubmitInput = React.forwardRef<
  RefObject<HTMLButtonElement>,
  ButtonProps & { label: string } & { callback: () => void }
>((props, ref) => {
  let boxStyle: SxProps = {
    width: "50vw",
    display: "flex",
    justifyContent: "end",
    marginBottom: "40px",
  };

  return (
    <Box sx={boxStyle} ref={ref}>
      <Button type="submit" variant="contained">
        {props.label}
      </Button>
    </Box>
  );
});

export default SubmitInput;
