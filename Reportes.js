import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

// Iconos
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import FilterListIcon from '@mui/icons-material/FilterList';

// Datos de ejemplo para reportes
const reportesData = [
  {
    id: 1,
    nombre: 'Asistencia por Capacitación',
    descripcion: 'Muestra la asistencia de participantes por cada capacitación realizada',
    tipo: 'Asistencia',
    icono: <BarChartIcon />,
  },
  {
    id: 2,
    nombre: 'Certificados Emitidos',
    descripcion: 'Detalle de certificados emitidos por período',
    tipo: 'Certificados',
    icono: <TableChartIcon />,
  },
  {
    id: 3,
    nombre: 'Participantes por Tipo',
    descripcion: 'Distribución de participantes por tipo (empleados, contratistas, comunidades)',
    tipo: 'Participantes',
    icono: <PieChartIcon />,
  },
  {
    id: 4,
    nombre: 'Capacitaciones por Mes',
    descripcion: 'Número de capacitaciones realizadas por mes',
    tipo: 'Capacitaciones',
    icono: <BarChartIcon />,
  },
];

// Datos de ejemplo para el reporte seleccionado
const datosReporteEjemplo = [
  { capacitacion: 'Seguridad Agrícola', asistentes: 25, completaron: 22 },
  { capacitacion: 'Manejo de Plaguicidas', asistentes: 18, completaron: 15 },
  { capacitacion: 'Buenas Prácticas Agrícolas', asistentes: 30, completaron: 28 },
  { capacitacion: 'Primeros Auxilios', asistentes: 20, completaron: 20 },
];

const Reportes = () => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  const handleSeleccionarReporte = (reporte) => {
    setReporteSeleccionado(reporte);
  };

  const handleGenerarReporte = () => {
    console.log('Generando reporte:', {
      reporte: reporteSeleccionado,
      fechaInicio,
      fechaFin,
      filtroTipo,
    });
    // Aquí iría la lógica para generar el reporte
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reportes y Estadísticas
      </Typography>

      {!reporteSeleccionado ? (
        // Lista de reportes disponibles
        <Grid container spacing={3}>
          {reportesData.map((reporte) => (
            <Grid item xs={12} sm={6} md={4} key={reporte.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 }
                }}
                onClick={() => handleSeleccionarReporte(reporte)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', mb: 2, color: 'primary.main' }}>
                    {reporte.icono}
                  </Box>
                  <Typography variant="h6" component="div">
                    {reporte.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {reporte.descripcion}
                  </Typography>
                  <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
                    Tipo: {reporte.tipo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Vista de reporte seleccionado
        <Box>
          <Button 
            variant="outlined" 
            sx={{ mb: 3 }}
            onClick={() => setReporteSeleccionado(null)}
          >
            Volver a la lista de reportes
          </Button>
          
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {reporteSeleccionado.nombre}
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha Inicio"
                    value={fechaInicio}
                    onChange={(newValue) => setFechaInicio(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Fecha Fin"
                    value={fechaFin}
                    onChange={(newValue) => setFechaFin(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Filtrar por tipo</InputLabel>
                  <Select
                    value={filtroTipo}
                    label="Filtrar por tipo"
                    onChange={(e) => setFiltroTipo(e.target.value)}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Empleados">Empleados</MenuItem>
                    <MenuItem value="Contratistas">Contratistas</MenuItem>
                    <MenuItem value="Comunidades">Comunidades</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<FilterListIcon />}
                  onClick={handleGenerarReporte}
                  fullWidth
                >
                  Generar Reporte
                </Button>
              </Grid>
            </Grid>
            
            {/* Ejemplo de visualización de datos */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton color="primary" title="Imprimir">
                <PrintIcon />
              </IconButton>
              <IconButton color="primary" title="Descargar">
                <DownloadIcon />
              </IconButton>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Capacitación</TableCell>
                    <TableCell align="right">Asistentes</TableCell>
                    <TableCell align="right">Completaron</TableCell>
                    <TableCell align="right">% Completado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datosReporteEjemplo.map((fila) => (
                    <TableRow key={fila.capacitacion}>
                      <TableCell component="th" scope="row">
                        {fila.capacitacion}
                      </TableCell>
                      <TableCell align="right">{fila.asistentes}</TableCell>
                      <TableCell align="right">{fila.completaron}</TableCell>
                      <TableCell align="right">
                        {Math.round((fila.completaron / fila.asistentes) * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Reportes;