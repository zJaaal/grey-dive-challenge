import { Box, Button, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid/models";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getResponses } from "../../firebase";
import FadeIn from "../form/components/animate/FadeIn";

const AnswersPage = () => {
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GridRowsProp>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const navigate = useNavigate();

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  useEffect(() => {
    setLoading(true);
    getResponses()
      .then((result) => {
        if (isMounted.current) {
          setData(result.data);
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Parece que algo salio mal",
          confirmButtonColor: "#4A00E0",
          icon: "error",
        }).then(() => navigate("/"));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (data[0]) {
      let columns = Object.keys(data[0]).map((key) => ({
        field: key,
        flex: 1,
      }));

      setColumns(columns);
    }
  }, [data]);

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
      {loading ? (
        <CircularProgress size={"100px"} sx={{ color: "white" }} />
      ) : (
        <>
          <Box sx={{ display: "flex", width: "90%" }}>
            <IconButton onClick={() => navigate("/")}>
              <HomeIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <FadeIn style={{ height: "70vh", width: "90%", marginTop: "10px" }}>
            <DataGrid rows={data} columns={columns} sx={{ backgroundColor: "white" }} />
          </FadeIn>
        </>
      )}
    </Grid>
  );
};

export default AnswersPage;
