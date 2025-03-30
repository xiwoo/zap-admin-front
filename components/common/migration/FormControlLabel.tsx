import { JSX } from 'react';
import { FormControlLabel as MuiFormControlLabel, FormControlLabelProps } from '@mui/material';
import Typography from './Typography';

const FormControlLabel = ({
  ...props
}: FormControlLabelProps): JSX.Element => {

  return (
    <MuiFormControlLabel {...props} slots={{typography: Typography}}/>
  );
};

export default FormControlLabel;