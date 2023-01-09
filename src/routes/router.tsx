import React from "react";
import { createBrowserRouter, Router } from "react-router-dom";
import ValidationProvider from "../context/validation/ValidationProvider";
import NotFound from "../pages/404/NotFound";
import AnswersPage from "../pages/answers/AnswersPage";
import FormPage from "../pages/form/FormPage";
import { routes } from "./routes";

//Router created with the new React Router API
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
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
