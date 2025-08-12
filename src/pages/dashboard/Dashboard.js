import React from 'react'; // Importación de React

// Componentes de Material UI para la interfaz
import {
  Box, // Contenedor flexible
  Typography, // Componente para texto con estilos tipográficos
  Paper, // Superficie elevada para contenido
  Grid, // Sistema de rejilla para layout
  Card, // Tarjeta para mostrar contenido
  CardContent, // Contenido interno de tarjeta
  List, // Lista de elementos
  ListItem, // Elemento de lista
  ListItemIcon, // Icono en elemento de lista
  ListItemText, // Texto en elemento de lista
  Divider, // Separador visual
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Iconos de Material UI
import EventIcon from '@mui/icons-material/Event'; // Icono de calendario/eventos
import PeopleIcon from '@mui/icons-material/People'; // Icono de personas
import SchoolIcon from '@mui/icons-material/School'; // Icono de educación/capacitación
import CircleIcon from '@mui/icons-material/Circle'; // Icono de círculo para indicadores

// Componentes de Recharts para gráficos estadísticos
import { 
  BarChart, // Gráfico de barras
  Bar, // Barra individual en gráfico
  XAxis, // Eje X
  YAxis, // Eje Y
  CartesianGrid, // Cuadrícula de fondo
  Tooltip, // Información al pasar el mouse
  ResponsiveContainer // Contenedor que se adapta al tamaño
} from 'recharts';

// Datos de ejemplo para el gráfico de asistencia mensual
const asistenciaData = [
  { name: 'Enero', porcentaje: 83 },  // Datos de enero
  { name: 'Febrero', porcentaje: 91 }, // Datos de febrero
  { name: 'Marzo', porcentaje: 78 },   // Datos de marzo
  { name: 'Abril', porcentaje: 94 },   // Datos de abril
  { name: 'Mayo', porcentaje: 86 },    // Datos de mayo
  { name: 'Junio', porcentaje: 92 },   // Datos de junio
];

// Datos de ejemplo para la lista de capacitaciones recientes
const capacitacionesRecientes = [
  { id: 1, titulo: 'Curso Seguridad Agrícola', dias: 2 }, // Capacitación reciente 1
  { id: 2, titulo: 'Manejo de Plaguicidas', dias: 5 },   // Capacitación reciente 2
];

/**
 * Componente para las tarjetas de estadísticas
 * Muestra un indicador estadístico con icono, valor y etiqueta
 * 
 * @param {Component} icon - Componente de icono de Material UI
 * @param {string|number} value - Valor numérico o texto a mostrar
 * @param {string} label - Etiqueta descriptiva
 * @param {string} color - Color para el icono
 */
const StatCard = ({ icon, value, label, color }) => {
  const IconComponent = icon; // Componente de icono dinámico
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center', py: 3 }}>
        {/* Contenedor para el icono */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <IconComponent sx={{ fontSize: 48, color }} />
        </Box>
        {/* Valor principal */}
        <Typography variant="h3" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
          {value}
        </Typography>
        {/* Etiqueta descriptiva */}
        <Typography variant="body1" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Componente principal del Dashboard
 * Muestra estadísticas generales y gráficos del sistema
 */
const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      {/* Capacitaciones Recientes */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Capacitaciones Recientes</Typography>
        </Box>
        <List>
          {capacitacionesRecientes.map((capacitacion) => (
            <React.Fragment key={capacitacion.id}>
              <ListItem>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 10, color: 'primary.main' }} />
                </ListItemIcon>
                <ListItemText 
                  primary={capacitacion.titulo} 
                  secondary={`Hace ${capacitacion.dias} días`}
                />
              </ListItem>
              {capacitacion.id !== capacitacionesRecientes.length && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      
      {/* Tarjetas de estadísticas */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard 
            icon={EventIcon} 
            value="15" 
            label="Sesiones este mes" 
            color="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            icon={PeopleIcon} 
            value="142" 
            label="Participantes" 
            color="#673ab7"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            icon={SchoolIcon} 
            value="87%" 
            label="Completados" 
            color="#4caf50"
          />
        </Grid>
      </Grid>
      
      {/* Gráfico de Asistencia */}
      <Paper elevation={2} sx={{ p: 3 }}>
        {/* Encabezado del gráfico con icono */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BarChart width={24} height={24} data={[{value: 1}]}>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
          <Typography variant="h6" sx={{ ml: 1 }}>Gráfico de Asistencia</Typography>
        </Box>
        {/* Contenedor responsivo para el gráfico */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={asistenciaData} // Datos mensuales de asistencia
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" /> {/* Cuadrícula de fondo */}
            <XAxis dataKey="name" /> {/* Eje X con nombres de meses */}
            <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} /> {/* Eje Y con formato de porcentaje */}
            <Tooltip formatter={(value) => [`${value}%`, 'Asistencia']} /> {/* Tooltip personalizado */}
            <Bar dataKey="porcentaje" fill="#4caf50" /> {/* Barras de color verde */}
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

// Exportamos el componente Dashboard como predeterminado
export default Dashboard;