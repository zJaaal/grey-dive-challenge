import { Grid, Typography } from "@mui/material";
import React from "react";

const AnswersPage = () => {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      className="background"
    >
      <Typography variant="h1"> Answers</Typography>
    </Grid>
  );
};

export default AnswersPage;
