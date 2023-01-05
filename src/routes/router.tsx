import React from "react";
import { createBrowserRouter, Router } from "react-router-dom";
import FormPage from "../pages/form/FormPage";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    element: <FormPage />,
    path: routes.main,
  },
  // {
  //   element: <ReviewPage />,
  //   path: routes.review,
  // },
]);

export default router;
