import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "Parece que te has perdido",
      icon: "error",
      confirmButtonText: "Volver al inicio",
      confirmButtonColor: "#4A00E0",
    }).then(() => navigate("/"));
  }, []);

  return <div className="background" style={{ height: "100vh", width: "100vw" }}></div>;
};

export default NotFound;
