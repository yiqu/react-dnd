import { FormControl, FormHelperText, TextField, TextFieldProps, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { red } from '@mui/material/colors';

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
      }) => {
        return (
          <FormControl fullWidth={ props.fullWidth } size={ props.size ?? 'medium' }>
            <TextField id={ name } label={ label } { ...props } { ...field } error={ !!(error) } helperText={ undefined } />
            <FormHelperText id={ `${name}-helper-text` } error={ !!error } sx={ {ml: 0} } >
              {
                <Typography variant="caption" color={ red } component="span"> { error ? error.message : props.helperText } </Typography>
              }
            </FormHelperText>
          </FormControl>
        );
       } }
    />
  );
}

export default HFTextField;