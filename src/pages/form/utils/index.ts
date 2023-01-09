import { Variants } from "framer-motion";
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

export const getProgressBarTransition = (prev: number, value: number, max: number): Variants => {
  let currentPercentage = (value * 100) / max;
  let lastPercentage = (prev * 100) / max;

  return {
    in: {
      background: `linear-gradient(to right, transparent 0%, transparent ${currentPercentage}%, white ${currentPercentage}%, white 100%)`,
    },
    out: {
      background: `linear-gradient(to right, transparent 0%, transparent ${lastPercentage}%, white ${lastPercentage}%, white 100%)`,
    },
  };
};
