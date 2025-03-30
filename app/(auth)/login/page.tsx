'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { 
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';

import {
  FormControlLabel as CustomFormControlLabel,
  Typography as CustomTypography,
  Button as CustomButton,
  Checkbox as CustomCheckbox,
  TextField as CustomTextField,
  FormLabel as CustomFormLabel,
} from '@/components/common/migration';

import Link from '@mui/material/Link';

import AppTheme from '@/components/common/AppTheme';

import ForgotPassword from '@/components/auth/ForgetPassword';
import { SitemarkIcon } from '@/components/auth/CustomIcons';


// ---- UI

import AdminsAuthAPI from '@/api/client/AdminsAuthAPI';


export default function SignIn( ) {

  const router = useRouter();

  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    if ( passwordError ) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const { loginStatus, error } = await AdminsAuthAPI.postLogin({ 
      identify: data.get('identify')!!.toString(),
      password: data.get('password')!!.toString(),
    });
    
    switch(loginStatus) {
      case 'INVALIDE': {
        alert(error?.message);
        break;
      }
      case 'ACTIVE': {
        router.push('/');
        break;
      }
      case 'PASSWORD_RESET_REQUIRED': {
        // login 페이지로 돌리고, TODO: 모달로 비밀번호 초기화 처리 요청 알림
        router.push('/login?');
        break;
      }
      case 'PASSWORD_NEEDS_UPDATE': {
        // 패스워드 변경 필요
        router.push('/password');
        break;
      }
    }

  };

  const validateInputs = () => {

    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
    {/* <AppTheme> */}
      <SitemarkIcon />

      <CustomTypography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </CustomTypography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <CustomFormLabel htmlFor="identify">ID</CustomFormLabel>
          <CustomTextField
            id="identify"
            type="text"
            name="identify"
            placeholder="ID"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color="primary"
          />
        </FormControl>
            
        <FormControl>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>

        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}

        <CustomFormControlLabel
          control={<CustomCheckbox value="remember" color="primary" />}
          label="Remember me"
        />
        <ForgotPassword open={open} handleClose={handleClose} />
        
        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign in
        </Button> */}
        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          New Sign in
        </CustomButton>

        <Link
          component="button"
          type="button"
          onClick={handleClickOpen}
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Forgot your password?
        </Link>
      </Box>
      {/* </AppTheme>  */}
    </>
  );
}