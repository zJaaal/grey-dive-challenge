import CheckboxInput from "../components/inputs/CheckboxInput";
import DateInput from "../components/inputs/DateInput";
import SelectCustomInput from "../components/inputs/SelectInput";
import SubmitInput from "../components/inputs/SubmitInput";
import TextInput from "../components/inputs/TextInput";

//Here we read the input type
export const InputComponents: any = {
  text: TextInput,
  email: TextInput,
  date: DateInput,
  select: SelectCustomInput,
  checkbox: CheckboxInput,
  submit: SubmitInput,
};
