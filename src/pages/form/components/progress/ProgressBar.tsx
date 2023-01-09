import { Box } from "@mui/material";
import React, { FC } from "react";
import { ProgressBarProps } from "./types";
import { motion } from "framer-motion";

import "./ProgressBar.style.css";
import { getProgressBarTransition } from "../../utils";
const ProgressBar: FC<ProgressBarProps> = ({ value, max, prev }) => {
  return (
    <Box
      sx={{
        width: { xs: "88%", sm: "68%", md: "48%" },
      }}
    >
      <motion.div
        key={value}
        initial={"out"}
        animate={"in"}
        variants={getProgressBarTransition(prev, value, max)}
        transition={{ type: "keyframes", duration: 0.5 }}
        className="progress"
      ></motion.div>
    </Box>
  );
};

export default ProgressBar;
