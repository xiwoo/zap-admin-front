'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { 
  Box,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  Button,
  FormLabel,
  Typography,
  TextField,
} from '@/components/common/migration';

import AppTheme from '@/components/common/AppTheme';

// ---- UI

import AdminsAuthAPI from '@/api/client/AdminsAuthAPI';


export default function ChangePassword( ) {

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
      prevPassword: data.get('prevPassword')!!.toString(),
      nextPassword: data.get('nextPassword')!!.toString(),
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
    <>
      {/* <SitemarkIcon /> */}

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

          <FormLabel htmlFor="prevPassword" color='secondary' >Prev Password</FormLabel>
          <TextField
            error={prevPasswordError}
            helperText={prevPasswordErrorMessage}
            id="prevPassword"
            name="prevPassword"
            placeholder="••••••"
            type="password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password" color='secondary' >Next Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            id="nextPassword"
            name="nextPassword"
            placeholder="••••••"
            type="password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password" color='secondary' >Password Check</FormLabel>
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
    </>
  );
}