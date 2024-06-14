import * as React from 'react';
import '../App.css';
import '../fonts.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// 전역 폰트 설정을 위한 테마 생성
const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans KR, Arial, sans-serif', // 원하는 폰트로 설정
  },
});

export default function FormPropsTextFields() {
  return (
    <ThemeProvider theme={theme}>  // ThemeProvider를 사용하여 폰트 테마 적용
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
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
        </div>
      </Box>
    </ThemeProvider>
  );
}
