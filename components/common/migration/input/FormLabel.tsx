import { JSX } from 'react';
import { FormLabel as MuiFormLabel, FormLabelProps } from '@mui/material';


export const FormLabel = ({
  color='primary',
  ...props
}: FormLabelProps): JSX.Element => {

  let colorClasses = ""
  if ( color === 'primary' ) {
    colorClasses = "text-gray-800 dark:text-white";
  }
  else if ( color === 'secondary' ) {
    colorClasses = "text-gray-600 dark:text-gray-600"
  }
  else if( color === 'warning' ) {
    colorClasses = "text-orange-400";
  }

  return (
    <MuiFormLabel 
      {...props}
      className={`mb-[8px] ${colorClasses}`}
    />
  );
}