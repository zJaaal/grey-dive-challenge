import React from "react";
import { createBrowserRouter, Router } from "react-router-dom";
import ValidationProvider from "../context/validation/ValidationProvider";
import FormPage from "../pages/form/FormPage";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    element: (
      <ValidationProvider>
        <FormPage />,
      </ValidationProvider>
    ),
    path: routes.main,
  },
  // {
  //   element: <ReviewPage />,
  //   path: routes.review,
  // },
]);

export default router;
