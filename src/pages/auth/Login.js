import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Iconos
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Logo
import palmLogo from '../../assets/palm-logo.svg';

const LoginContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(2),
  backgroundColor: '#e8f5e9', // Fondo verde claro
}));

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Logo = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  marginBottom: theme.spacing(2),
}));

const Login = ({ recoveryMode = false }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Datos de inicio de sesión:', formData);
    navigate('/dashboard');
  };

  return (
    <LoginContainer>
      <LoginForm elevation={3}>
        <Logo src={palmLogo} alt="PALMASA Logo" />
        <Typography variant="h4" component="h1" gutterBottom align="center">
          SIGCAP
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom align="center">
          Sistema de Gestión de Capacitaciones
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          {recoveryMode ? (
            <>
              <Typography variant="h6" gutterBottom>
                Recuperar Contraseña
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar Instrucciones
              </Button>
            </>
          ) : (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ingrese su usuario"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      value="remember" 
                      color="primary" 
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                  }
                  label="Recordar"
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                INGRESAR
              </Button>
            </>
          )}

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            {recoveryMode ? (
              <Link href="/" variant="body2">
                Volver al inicio de sesión
              </Link>
            ) : (
              <Link href="/recuperar-password" variant="body2">
                ¿Olvidó contraseña?
              </Link>
            )}
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          PALMASA © {new Date().getFullYear()} - Todos los derechos reservados
        </Typography>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;