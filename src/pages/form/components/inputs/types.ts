import {
  CheckboxProps,
  FormControlLabelProps,
  FormControlProps,
  MenuItemProps,
  SelectProps,
  TextFieldProps,
} from "@mui/material";
import { DatePickerProps } from "@mui/x-date-pickers";
import { Moment } from "moment";
import { ValidateResponse } from "../../../../context/validation/types";

export type TextInputProps = FormControlProps & TextFieldProps;
export type DateInputProps = DatePickerProps<Date, Moment> & FormControlProps & TextFieldProps;
export type SelectInputProps = SelectProps & FormControlProps & { options: OptionsProps[] };
export type CheckboxInputProps = CheckboxProps & FormControlProps & FormControlLabelProps;

interface OptionsProps extends MenuItemProps {
  label: string;
}
