import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";


export interface HFTextFieldProps {
  name: string;
  label: string;
  control: any;
}

export type FieldProps = HFTextFieldProps & TextFieldProps;

function HFTextField({ name, label, control, ...props }: FieldProps) {

  return (
    <Controller
      name={ name }
      control={ control }
      render={ ({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <TextField id={ name } label={ label } { ...field } { ...props } />
      ) }
    />
  );
}

export default HFTextField;