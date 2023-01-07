import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { FC } from "react";
import { WelcomeCardProps } from "./types";

const WelcomeCard: FC<WelcomeCardProps> = ({ callback }) => {
  return (
    <Card
      className="glass"
      sx={{
        width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" },
        height: 300,
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 40, fontWeight: 500, textAlign: "center" }} gutterBottom>
          ¡Bienvenido!
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 18, fontWeight: 400, textAlign: "center" }}>
          Antes de continuar necesitamos saber algunas cosas sobre ti
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 3,
        }}
      >
        <Button size="medium" variant="contained" onClick={callback}>
          Empezar
        </Button>
      </CardActions>
    </Card>
  );
};

export default WelcomeCard;
