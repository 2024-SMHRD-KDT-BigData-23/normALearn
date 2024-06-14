import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard, Arial, sans-serif',
  },
});

export default function FormPropsTextFields() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="filled-required"
          label="로그인한회사명"
          defaultValue="내용입력"
          variant="filled"
          InputProps={{
            style: { height: '150px' }
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
