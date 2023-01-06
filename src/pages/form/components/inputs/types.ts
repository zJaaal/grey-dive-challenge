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

export type TextInputProps = FormControlProps & TextFieldProps;
export type DateInputProps = DatePickerProps<Moment, Moment> & FormControlProps & TextFieldProps;
export type SelectInputProps = SelectProps & FormControlProps & { options: OptionsProps[] };
export type CheckboxInputProps = CheckboxProps & FormControlProps & FormControlLabelProps;

interface OptionsProps extends MenuItemProps {
  label: string;
}
