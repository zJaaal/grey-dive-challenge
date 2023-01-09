import { createContext } from "react";

type ValidationContextType = {
  formValues?: any;
  handleFormValueChange?: (key: string, value: string | Date | boolean) => void;
  saveAnswers?: () => Promise<boolean>;
  validateFormValue?: (key: string, value?: string | Date | boolean) => void;
  formErrors?: any;
  loading?: boolean;
};

export const ValidationContext = createContext<ValidationContextType>({});
