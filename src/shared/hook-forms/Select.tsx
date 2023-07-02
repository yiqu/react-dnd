import { FormHelperText, SelectProps, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { red } from '@mui/material/colors';


export interface HFSelectFieldProps {
  name: string;
  label: string;
  helperText?: string;
  control: any;
  children: React.ReactNode;
}

export type FieldProps = HFSelectFieldProps & SelectProps;

function HFSelectField({ name, label, control, children, ...props }: FieldProps) {

  return (
    <Controller
      name={ name }
      control={ control }
      render={ ({
        field,
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <FormControl variant={ props.variant } fullWidth>
          <InputLabel id="">{ label } </InputLabel>
          <Select
            labelId=""
            id="select-id"
            label={ label }
            { ...field }
            error={ !!(error) }
          >
            { children }
          </Select>
          <FormHelperText id={ `${name}-helper-text` } error={ !!error } sx={ {ml: 0} } >
            {
              <Typography variant="caption" color={ red } component="span"> { error ? error.message : props.helperText } </Typography>
            }
          </FormHelperText>
        </FormControl>
      ) }
    />
  );
}

export default HFSelectField;