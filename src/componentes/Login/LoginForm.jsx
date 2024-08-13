import React from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Arial',
    h4: {
      fontWeight: 600,
      color: '#ffffff',
    },
  },
});

const LoginPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          background: 'linear-gradient(to right, #432c85, #c94277)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#ffffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: '#ffffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <FormControlLabel
            control={<Checkbox style={{ color: '#ffffff' }} />}
            label={<Typography style={{ color: '#ffffff' }}>Remember me</Typography>}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Login
          </Button>
          <Typography
            align="center"
            style={{ color: '#ffffff', marginTop: '1rem', cursor: 'pointer' }}
          >
            Forgot password?
          </Typography>
          
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
