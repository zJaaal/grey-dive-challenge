import { Box } from "@mui/material";
import React, { FC } from "react";
import { ProgressBarProps } from "./types";
import { motion } from "framer-motion";

import "./ProgressBar.style.css";
const ProgressBar: FC<ProgressBarProps> = ({ value, max, prev }) => {
  let currentPercentage = (value * 100) / max;
  let lastPercentage = (prev * 100) / max;

  let transitions = {
    in: {
      background: `linear-gradient(to right, transparent 0%, transparent ${currentPercentage}%, white ${currentPercentage}%, white 100%)`,
    },
    out: {
      background: `linear-gradient(to right, transparent 0%, transparent ${lastPercentage}%, white ${lastPercentage}%, white 100%)`,
    },
  };

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
        variants={transitions}
        transition={{ type: "keyframes", duration: 0.5 }}
        className="progress"
      ></motion.div>
    </Box>
  );
};

export default ProgressBar;
