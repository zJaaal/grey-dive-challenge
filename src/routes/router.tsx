import React from "react";
import { createBrowserRouter, Router } from "react-router-dom";
import ValidationProvider from "../context/validation/ValidationProvider";
import AnswersPage from "../pages/answers/AnswersPage";
import FormPage from "../pages/form/FormPage";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    element: (
      <ValidationProvider>
        <FormPage />
      </ValidationProvider>
    ),
    path: routes.main,
  },
  {
    element: <AnswersPage />,
    path: routes.answers,
  },
]);

export default router;
