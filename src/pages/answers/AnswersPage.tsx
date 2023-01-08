import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getResponses } from "../../firebase";

const AnswersPage = () => {
  useEffect(() => {
    getResponses().then((result) => console.log(result));
  }, []);

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
