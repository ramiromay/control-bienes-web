import React, { useEffect } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSistema } from '../../context/SistemaContext';
import Imagen from '@img/not-found.png'

function NoEncontradoPage() {
  const navigate = useNavigate();
  const {handleDesactivarNavBar} = useSistema();

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    document.title = 'SICBA - Página no encontrada';
    handleDesactivarNavBar();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#ffffff', // Fondo blanco
        color: '#3c4043',
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 500, color: '#5f6368', mb: 2 }}>
        Oops!
      </Typography>
      <img height={300} src={Imagen}/>
    
      <Typography variant="h5" sx={{ fontWeight: 400, mb: 1, color: '#3c4043' }}>
        PAGINA NO ENCONTRADA
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          color: '#5f6368',
          mb: 3,
          maxWidth: '500px',
          padding: 1,
        }}
      >
        Lo sentimos, la página que estás buscando no existe. Si crees que algo no funciona, informa el problema.
      </Typography>
      
      {/* Botones */}
      <Stack direction="row" spacing={2}>
        <Button
        onClick={handleGoHome}
          variant="outlined"
          sx={{
            color: '#1a73e8',
            borderColor: '#1a73e8',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#e8f0fe',
              borderColor: '#1a73e8',
            },
          }}
        >
          Ir a la pagina principal
        </Button>
      </Stack>
    </Box>
  );
}

export default NoEncontradoPage;
