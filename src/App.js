import React from 'react';
// Importamos React Router para la navegación entre páginas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importamos componentes de Material UI para el tema y estilos
import { ThemeProvider, createTheme } from '@mui/material/styles';
// CssBaseline normaliza los estilos CSS entre navegadores
import CssBaseline from '@mui/material/CssBaseline';

// Layouts - Estructuras de página reutilizables
import MainLayout from './components/layout/MainLayout'; // Layout principal con menú lateral
import AuthLayout from './components/layout/AuthLayout'; // Layout para páginas de autenticación

// Páginas de la aplicación
import Login from './pages/auth/Login'; // Página de inicio de sesión
import Dashboard from './pages/dashboard/Dashboard'; // Panel principal con resumen
import Capacitaciones from './pages/capacitaciones/Capacitaciones'; // Gestión de capacitaciones
import Personas from './pages/participantes/Personas'; // Gestión de participantes
import Asistencia from './pages/asistencia/Asistencia'; // Control de asistencia
import Certificados from './pages/certificados/Certificados'; // Gestión de certificados
import Reportes from './pages/reportes/Reportes'; // Generación de reportes
import Administracion from './pages/admin/Administracion'; // Configuración del sistema

// Contexto de autenticación para gestionar el estado de sesión del usuario
import { AuthProvider } from './context/AuthContext';

// Configuración del tema personalizado para la aplicación
const theme = createTheme({
  // Paleta de colores de la aplicación
  palette: {
    primary: {
      main: '#2e7d32', // Verde PALMASA - Color principal de la marca
    },
    secondary: {
      main: '#f57c00', // Naranja complementario - Color secundario para acentos
    },
    background: {
      default: '#f5f5f5', // Color de fondo gris claro para mejor legibilidad
    },
  },
  // Configuración de tipografía
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Fuentes principales
    h5: {
      fontWeight: 600, // Títulos nivel 5 con peso semi-negrita
    },
    h6: {
      fontWeight: 500, // Títulos nivel 6 con peso medio
    },
  },
});

/**
 * Componente principal de la aplicación
 * Configura el tema, el contexto de autenticación y las rutas de navegación
 */
function App() {
  return (
    // Proveedor de tema que aplica los estilos definidos a toda la aplicación
    <ThemeProvider theme={theme}>
      {/* Normaliza los estilos CSS base entre diferentes navegadores */}
      <CssBaseline />
      {/* Proveedor de autenticación que gestiona el estado de sesión del usuario */}
      <AuthProvider>
        {/* Router principal que maneja la navegación */}
        <Router>
          <Routes>
            {/* Rutas de autenticación - accesibles sin iniciar sesión */}
            <Route path="/" element={<AuthLayout />}>
              {/* Ruta raíz que muestra el formulario de inicio de sesión */}
              <Route index element={<Login />} />
              {/* Ruta para recuperación de contraseña */}
              <Route path="recuperar-password" element={<Login recoveryMode={true} />} />
            </Route>
            
            {/* Rutas protegidas - requieren autenticación */}
            <Route path="/dashboard" element={<MainLayout />}>
              {/* Dashboard principal - página de inicio tras autenticación */}
              <Route index element={<Dashboard />} />
              {/* Módulos del sistema con rutas anidadas (/* permite subrutas) */}
              <Route path="capacitaciones/*" element={<Capacitaciones />} />
              <Route path="personas/*" element={<Personas />} />
              <Route path="asistencia/*" element={<Asistencia />} />
              <Route path="certificados/*" element={<Certificados />} />
              <Route path="reportes/*" element={<Reportes />} />
              <Route path="administracion/*" element={<Administracion />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;