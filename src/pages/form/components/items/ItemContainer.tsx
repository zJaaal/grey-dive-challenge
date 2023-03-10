import { Card, CardContent, CardActions } from "@mui/material";
import { FC } from "react";
import { ItemContainerProps } from "./types";

/**
 * @description This components creates a container that accepts the custom input and the action buttons
 */
const ItemContainer: FC<ItemContainerProps> = ({ Item, Action }) => {
  return (
    <Card
      sx={{
        width: { xs: "90%", sm: "70%", md: "50%" },
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
