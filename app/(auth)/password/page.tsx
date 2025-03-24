'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { 
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  Slider,
  Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

import AppTheme from '@/components/common/AppTheme';
import ColorModeSelect from '@/components/ColorModeSelect';

import ForgotPassword from '@/components/login/ForgetPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '@/components/login/CustomIcons';

// ---- UI

import AdminsAuthAPI from '@/api/client/adminsAuth';

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

const PasswordChangeContainer = styled(Stack)(({ theme }) => ({
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

export default function ChangePassword(props: { disableCustomTheme?: boolean }) {

  const router = useRouter();
  const [prevPasswordError, setPrevPasswordError] = React.useState(false);
  const [prevPasswordErrorMessage, setPrevPasswordErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    if ( prevPasswordError || passwordError ) {
      return;
    }

    const data = new FormData(event.currentTarget);

    const changePasswordResult = await AdminsAuthAPI.postChangePassword({ 
      prevPassword: data.get('prevPassword'),
      nextPassword: data.get('nextPassword'),
    });
    console.log(changePasswordResult);
    // TODO: 이전 비번 틀렸을 떄 알림처리
    // TODO: 비번 처리 완료되면 /login 으로 보내기
    
  };

  const validateInputs = () => {
    const prevPassword = document.getElementById('prevPassword') as HTMLInputElement;
    const nextPassword = document.getElementById('nextPassword') as HTMLInputElement;
    const passwordCheck = document.getElementById('passwordCheck') as HTMLInputElement;

    let isValid = true;
    if(!prevPassword.value) {
      setPrevPasswordError(true);
      setPrevPasswordErrorMessage('Prev Password Empty.');
      isValid = false;
    }
    else {
      setPrevPasswordError(false);
      setPrevPasswordErrorMessage('');
    }

    if (!nextPassword.value || nextPassword.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } 
    else if ( nextPassword.value !== passwordCheck.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Next Password and Password Check');
      isValid = false;
    }
    else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (

    <AppTheme {...props}>{/* TODO: 나중에 login 화면에 있는 내용과 합치자. SSR 로 그려지도록 */}
      <PasswordChangeContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Change Password
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
              <FormLabel htmlFor="prevPassword">Prev Password</FormLabel>
              <TextField
                error={prevPasswordError}
                helperText={prevPasswordErrorMessage}
                id="prevPassword"
                name="prevPassword"
                type="text"
                placeholder="••••••"
                type="password"
                // autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Next Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                id="nextPassword"
                name="nextPassword"
                type="text"
                placeholder="••••••"
                type="password"
                // autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password Check</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                id="passwordCheck"
                name="passwordCheck"
                placeholder="••••••"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Change Password
            </Button>
          </Box>
        </Card>
      </PasswordChangeContainer>
    </AppTheme>
  );
}