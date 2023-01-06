import { Box, Button, ButtonProps, SxProps } from "@mui/material";
import React, { RefObject, useContext } from "react";
import { ValidationContext } from "../../../../context/validation/ValidationContext";

const SubmitInput = React.forwardRef<
  RefObject<HTMLButtonElement>,
  ButtonProps & { label: string } & { callback: () => void }
>((props, ref) => {
  const { saveAnswers } = useContext(ValidationContext);

  let boxStyle: SxProps = {
    width: "50vw",
    display: "flex",
    justifyContent: "end",
    marginBottom: "40px",
  };

  return (
    <Box sx={boxStyle} ref={ref}>
      <Button type="submit" variant="contained" onClick={saveAnswers}>
        {props.label}
      </Button>
    </Box>
  );
});

export default SubmitInput;
