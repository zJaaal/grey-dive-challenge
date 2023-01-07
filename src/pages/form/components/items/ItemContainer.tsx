import { Card, CardContent, CardActions } from "@mui/material";
import { FC } from "react";
import { ItemContainerProps } from "./types";

const ItemContainer: FC<ItemContainerProps> = ({ Item, Action }) => {
  return (
    <Card
      className="glass"
      sx={{
        width: { xs: "90%", md: "50%", lg: "50%" },
        height: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ width: "80%", minHeight: 176 }}>{Item()}</CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        {Action()}
      </CardActions>
    </Card>
  );
};

export default ItemContainer;
