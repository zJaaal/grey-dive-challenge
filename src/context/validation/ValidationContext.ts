import { createContext } from "react";

export const ValidationContext = createContext<any>({
  formValues: {},
  handleFormValueChange: () => {},
});
