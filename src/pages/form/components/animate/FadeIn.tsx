import { motion } from "framer-motion";
import React, { FC } from "react";

let transitions = {
  in: {
    opacity: 1,
    translateY: 0,
  },
  out: {
    opacity: 0,
    translateY: 50,
  },
};

const FadeIn: FC<any> = ({ children, keyTrigger, style }) => {
  return (
    <motion.div
      key={keyTrigger}
      initial="out"
      animate="in"
      exit="out"
      transition={{ type: "keyframes", duration: 0.5 }}
      variants={transitions}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
