import React, { useState } from 'react'; // Importamos React y el hook useState para manejar estado
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // Hooks y componentes de React Router
import { styled } from '@mui/material/styles'; // Función para crear componentes con estilos personalizados
import {
  Box, // Contenedor flexible con propiedades de sistema de diseño
  Drawer, // Menú lateral deslizable
  AppBar, // Barra de navegación superior
  Toolbar, // Contenedor para elementos de la barra de navegación
  List, // Lista para elementos de menú
  Typography, // Componente para texto con estilos consistentes
  Divider, // Línea divisoria entre elementos
  IconButton, // Botón con icono
  ListItem, // Elemento de lista
  ListItemButton, // Botón dentro de elemento de lista
  ListItemIcon, // Icono dentro de elemento de lista
  ListItemText, // Texto dentro de elemento de lista
  Badge, // Insignia para mostrar notificaciones
  Avatar, // Imagen de perfil de usuario
  Menu, // Menú desplegable
  MenuItem, // Elemento de menú desplegable
  Tooltip // Tooltip para mostrar información al pasar el mouse
} from '@mui/material'; // Biblioteca de componentes Material UI

// Iconos de Material UI para la interfaz
import MenuIcon from '@mui/icons-material/Menu'; // Icono de hamburguesa para abrir/cerrar menú
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Flecha para cerrar menú
import DashboardIcon from '@mui/icons-material/Dashboard'; // Icono para Dashboard
import PeopleIcon from '@mui/icons-material/People'; // Icono para módulo de Personas
import SchoolIcon from '@mui/icons-material/School'; // Icono para módulo de Capacitaciones
import AssignmentIcon from '@mui/icons-material/Assignment'; // Icono para módulo de Asistencia
import CardMembershipIcon from '@mui/icons-material/CardMembership'; // Icono para módulo de Certificados
import BarChartIcon from '@mui/icons-material/BarChart'; // Icono para módulo de Reportes
import SettingsIcon from '@mui/icons-material/Settings'; // Icono para módulo de Administración
import NotificationsIcon from '@mui/icons-material/Notifications'; // Icono para notificaciones
import LogoutIcon from '@mui/icons-material/Logout'; // Icono para cerrar sesión

// Logo de PALMASA
import palmLogo from '../../assets/palm-logo.svg'; // Importamos el logo SVG de la empresa

// Ancho del menú lateral en píxeles
const drawerWidth = 240;

/**
 * Componente estilizado para el contenido principal
 * Se ajusta dinámicamente según si el menú está abierto o cerrado
 */
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1, // Ocupa todo el espacio disponible
    padding: theme.spacing(3), // Espaciado interno
    // Animación al cerrar el menú
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp, // Tipo de aceleración
      duration: theme.transitions.duration.leavingScreen, // Duración de la animación
    }),
    marginLeft: `-${drawerWidth}px`, // Margen negativo cuando el menú está cerrado
    // Estilos aplicados cuando el menú está abierto
    ...(open && {
      // Animación al abrir el menú
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0, // Sin margen cuando el menú está abierto
    }),
  }),
);

/**
 * Barra de navegación superior estilizada
 * Se ajusta dinámicamente según si el menú está abierto o cerrado
 */
const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // Animación al cerrar el menú
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // Estilos aplicados cuando el menú está abierto
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`, // Ancho reducido para dar espacio al menú
      marginLeft: `${drawerWidth}px`, // Margen igual al ancho del menú
      // Animación al abrir el menú
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

/**
 * Cabecera del menú lateral con el botón para cerrarlo
 */
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex', // Flexbox para alinear elementos
  alignItems: 'center', // Alineación vertical centrada
  padding: theme.spacing(0, 1), // Espaciado horizontal
  ...theme.mixins.toolbar, // Altura consistente con la barra de herramientas
  justifyContent: 'flex-end', // Alinea el botón de cerrar a la derecha
}));

// Configuración de los elementos del menú de navegación principal
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }, // Panel principal con estadísticas
  { text: 'Personas', icon: <PeopleIcon />, path: '/dashboard/personas' }, // Gestión de empleados y participantes
  { text: 'Capacitaciones', icon: <SchoolIcon />, path: '/dashboard/capacitaciones' }, // Gestión de cursos y capacitaciones
  { text: 'Asistencia', icon: <AssignmentIcon />, path: '/dashboard/asistencia' }, // Control de asistencia a capacitaciones
  { text: 'Certificados', icon: <CardMembershipIcon />, path: '/dashboard/certificados' }, // Gestión de certificados emitidos
  { text: 'Reportes', icon: <BarChartIcon />, path: '/dashboard/reportes' }, // Informes y estadísticas
  { text: 'Administración', icon: <SettingsIcon />, path: '/dashboard/administracion' }, // Configuración del sistema
];

/**
 * Componente principal de layout que contiene la estructura de la aplicación
 * Incluye barra superior, menú lateral y área de contenido principal
 */
const MainLayout = () => {
  // Estado para controlar si el menú lateral está abierto o cerrado
  const [open, setOpen] = useState(true);
  // Estado para controlar el menú desplegable del perfil de usuario
  const [anchorEl, setAnchorEl] = useState(null);
  // Hook para navegación entre rutas
  const navigate = useNavigate();
  // Hook para obtener la ubicación actual (ruta activa)
  const location = useLocation();

  /**
   * Abre el menú lateral
   */
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  /**
   * Cierra el menú lateral
   */
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /**
   * Abre el menú desplegable del perfil de usuario
   * @param {Event} event - Evento del clic
   */
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Cierra el menú desplegable del perfil de usuario
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /**
   * Maneja el cierre de sesión del usuario
   * Redirige al usuario a la página de inicio de sesión
   */
  const handleLogout = () => {
    // Lógica para cerrar sesión (pendiente de implementar autenticación)
    navigate('/');
  };

  // Determina si el menú de perfil está abierto
  const isMenuOpen = Boolean(anchorEl);

  return (
    /* Contenedor principal con flexbox para layout */
    <Box sx={{ display: 'flex' }}>
      {/* Barra de navegación superior que se ajusta cuando el menú está abierto */}
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          {/* Botón para abrir el menú lateral (Esto es visible solo cuando el menú está cerrado) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {/* Título de la aplicación */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SIGCAP - PALMASA
          </Typography>
          {/* Contenedor para iconos de la barra superior */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Icono de notificaciones con contador */}
            <Tooltip title="Notificaciones">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            {/* Botón de perfil de usuario */}
            <Tooltip title="Perfil de usuario">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Usuario Admin
                  </Typography>
                  {/* Avatar del usuario */}
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                    A
                  </Avatar>
                </Box>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBarStyled>
      {/* Menú desplegable para el perfil de usuario */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom', // Aparece debajo del botón
          horizontal: 'right', // Alineado a la derecha
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {/* Opciones del menú de usuario */}
        <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Configuración</MenuItem>
        <Divider /> {/* Separador visual */}
        {/* Opción para cerrar sesión */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>

      {/* Menú lateral (drawer) */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { // Estilos para el papel del drawer
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent" // Permanece visible cuando está abierto
        anchor="left" // Posicionado a la izquierda
        open={open} // Controlado por el estado open
      >
        {/* Cabecera del menú lateral con logo y botón para cerrar */}
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', px: 2 }}>
            {/* Logo de PALMASA */}
            <Box component="img" src={palmLogo} alt="PALMASA Logo" sx={{ height: 40, mr: 1 }} />
            <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
              PALMASA
            </Typography>
          </Box>
          {/* Botón para cerrar el menú lateral */}
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider /> {/* Separador visual */}
        {/* Título del menú de navegación */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, py: 1 }}>
          Menú Principal
        </Typography>
        {/* Lista de opciones del menú */}
        <List>
          {/* Mapeo de los elementos del menú definidos anteriormente */}
          {menuItems.map((item) => {
            // Determina si el elemento está activo basado en la ruta actual
            const isActive = location.pathname === item.path || 
                           (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton 
                  onClick={() => navigate(item.path)} // Navega a la ruta al hacer clic
                  selected={isActive} // Resalta el elemento activo
                  sx={{
                    '&.Mui-selected': { // Estilos para el elemento seleccionado
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  {/* Icono del elemento de menú */}
                  <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  {/* Texto del elemento de menú */}
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Contenido principal que se ajusta según el estado del menú */}
      <Main open={open}>
        <DrawerHeader /> {/* Espacio para compensar la altura de la barra superior */}
        <Outlet /> {/* Renderiza el componente hijo de la ruta actual */}
      </Main>
    </Box>
  );
};

export default MainLayout;