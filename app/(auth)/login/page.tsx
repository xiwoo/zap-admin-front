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
  Stack,
  Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

import AppTheme from '@/components/common/AppTheme';
import ColorModeSelect from '@/components/ColorModeSelect';

import ForgotPassword from '@/components/login/ForgetPassword';
import { SitemarkIcon } from '@/components/login/CustomIcons';

// ---- UI

import AdminsAuthAPI from '@/api/client/AdminsAuthAPI';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

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
    
    console.log(loginStatus);
    
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
    <AppTheme >
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
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
              <FormLabel htmlFor="identify">ID</FormLabel>
              <TextField
                // error={emailError}
                // helperText={emailErrorMessage}
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
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
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
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}