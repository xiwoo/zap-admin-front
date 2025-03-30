import { JSX } from 'react';
import { CardProps } from '@mui/material';
import { Card } from '../common/migration/surfaces/Card'; 


const AuthCard = ({
  children,
  ...props
}: CardProps): JSX.Element => {
  return (
    <Card
      className={`
        flex flex-col self-center w-full p-8 gap-4 m-auto 
        sm:max-w-[450px]
        shadow-[hsla(220,30%,5%,0.05)_0px_5px_15px_0px,hsla(220,25%,10%,0.05)_0px_15px_35px_-5px]
        dark:shadow-[hsla(220,30%,5%,0.5)_0px_5px_15px_0px,hsla(220,25%,10%,0.08)_0px_15px_35px_-5px]
      `}
      {...props}
    >
      {children}
    </Card>
  );
}

export default AuthCard;