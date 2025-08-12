import React, { useState } from 'react'; // Importación de React y hook useState

// Componentes de Material UI para la interfaz
import {
  Box, // Contenedor flexible
  Typography, // Componente para texto con estilos tipográficos
  Paper, // Superficie elevada para contenido
  Button, // Botón con estilos Material Design
  Table, // Tabla para mostrar datos estructurados
  TableBody, // Cuerpo de la tabla
  TableCell, // Celda de la tabla
  TableContainer, // Contenedor para la tabla
  TableHead, // Cabecera de la tabla
  TableRow, // Fila de la tabla
  TablePagination, // Paginación para la tabla
  Chip, // Etiqueta compacta
  IconButton, // Botón con icono
  TextField, // Campo de texto
  InputAdornment, // Decorador para campos de texto
  Dialog, // Ventana modal
  DialogTitle, // Título de ventana modal
  DialogContent, // Contenido de ventana modal
  DialogActions, // Acciones de ventana modal
  Grid, // Sistema de rejilla para layout
  FormControl, // Contenedor para controles de formulario
  InputLabel, // Etiqueta para campos de formulario
  Select, // Selector desplegable
  MenuItem // Elemento de menú para Select
} from '@mui/material';

// Componentes específicos de Material UI importados individualmente
import Checkbox from '@mui/material/Checkbox'; // Casilla de verificación
import FormControlLabel from '@mui/material/FormControlLabel'; // Etiqueta con control de formulario

// Iconos de Material UI
import AddIcon from '@mui/icons-material/Add'; // Icono de añadir (+)
import SearchIcon from '@mui/icons-material/Search'; // Icono de búsqueda (lupa)
import EditIcon from '@mui/icons-material/Edit'; // Icono de edición (lápiz)
import DeleteIcon from '@mui/icons-material/Delete'; // Icono de eliminación (papelera)
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icono de visualización (ojo)
import FilterListIcon from '@mui/icons-material/FilterList'; // Icono de filtro
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icono de verificación (círculo con check)
import CancelIcon from '@mui/icons-material/Cancel'; // Icono de cancelación (X)

// Datos de ejemplo para la tabla de asistencia
const asistenciaData = [
  {
    id: 1, // Identificador único del registro
    capacitacion: 'Curso Seguridad Agrícola', // Nombre de la capacitación
    fecha: '2023-05-10', // Fecha de la capacitación
    participante: 'Juan Pérez', // Nombre del participante
    tipoParticipante: 'Empleado', // Tipo de participante (Empleado, Contratista, etc.)
    asistio: true, // Indica si el participante asistió (true) o no (false)
  },
  {
    id: 2, // Identificador único del registro
    capacitacion: 'Curso Seguridad Agrícola', // Nombre de la capacitación
    fecha: '2023-05-10', // Fecha de la capacitación
    participante: 'María López', // Nombre del participante
    tipoParticipante: 'Empleado', // Tipo de participante
    asistio: true, // Asistió a la capacitación
  },
  {
    id: 3, // Identificador único del registro
    capacitacion: 'Curso Seguridad Agrícola', // Nombre de la capacitación
    fecha: '2023-05-10', // Fecha de la capacitación
    participante: 'Roberto Gómez', // Nombre del participante
    tipoParticipante: 'Contratista', // Tipo de participante
    asistio: false, // No asistió a la capacitación
  },
  {
    id: 4, // Identificador único del registro
    capacitacion: 'Manejo de Plaguicidas', // Nombre de la capacitación
    fecha: '2023-05-15', // Fecha de la capacitación
    participante: 'Carlos Rodríguez', // Nombre del participante
    tipoParticipante: 'Empleado', // Tipo de participante
    asistio: true, // Asistió a la capacitación
  },
];

// Datos de ejemplo para los formularios de registro y edición
const capacitaciones = ['Curso Seguridad Agrícola', 'Manejo de Plaguicidas', 'Buenas Prácticas Agrícolas']; // Lista de capacitaciones disponibles
const participantes = ['Juan Pérez', 'María López', 'Roberto Gómez', 'Carlos Rodríguez', 'Laura Martínez']; // Lista de participantes
const tiposParticipante = ['Empleado', 'Contratista', 'Comunidad']; // Tipos de participantes disponibles

/**
 * Componente principal para la gestión de asistencia a capacitaciones
 * Permite visualizar, buscar, registrar y editar registros de asistencia
 */
const Asistencia = () => {
  // Estados para la paginación de la tabla
  const [page, setPage] = useState(0); // Página actual (comienza en 0)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página
  
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  
  // Estado para controlar la apertura/cierre del diálogo de formulario
  const [openDialog, setOpenDialog] = useState(false);
  
  // Estado para almacenar los datos del registro de asistencia actual (para crear o editar)
  const [currentAsistencia, setCurrentAsistencia] = useState({
    capacitacion: '', // Nombre de la capacitación
    fecha: '', // Fecha de la capacitación
    participante: '', // Nombre del participante
    tipoParticipante: '', // Tipo de participante
    asistio: true, // Estado de asistencia (por defecto: asistió)
  });
  
  // Estado para controlar si estamos editando un registro existente
  const [isEditing, setIsEditing] = useState(false); // true: editando, false: creando nuevo

  /**
   * Filtra los registros de asistencia según el término de búsqueda
   * Busca coincidencias en los campos de capacitación y participante
   */
  const filteredAsistencia = asistenciaData.filter((asistencia) =>
    asistencia.capacitacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asistencia.participante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Maneja el cambio de página en la tabla paginada
   * @param {Event} event - Evento del cambio
   * @param {number} newPage - Número de la nueva página
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Maneja el cambio en el número de filas por página
   * @param {Event} event - Evento del cambio
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Vuelve a la primera página al cambiar el número de filas
  };

  /**
   * Maneja el cambio en el campo de búsqueda
   * @param {Event} event - Evento del cambio
   */
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Vuelve a la primera página al realizar una búsqueda
  };

  /**
   * Abre el diálogo para crear o editar un registro de asistencia
   * @param {Object|null} asistencia - Registro de asistencia a editar, o null para crear nuevo
   */
  const handleOpenDialog = (asistencia = null) => {
    if (asistencia) {
      setCurrentAsistencia(asistencia);
      setIsEditing(true);
    } else {
      setCurrentAsistencia({
        capacitacion: '',
        fecha: '',
        participante: '',
        tipoParticipante: '',
        asistio: true,
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  /**
   * Cierra el diálogo de creación/edición de asistencia
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /**
   * Maneja los cambios en los campos del formulario
   * @param {Event} e - Evento del cambio
   */
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setCurrentAsistencia({
      ...currentAsistencia,
      // Usa el valor de checked para el campo asistio (checkbox), o el valor normal para otros campos
      [name]: name === 'asistio' ? checked : value,
    });
  };

  /**
   * Guarda el registro de asistencia (nuevo o editado)
   * En una implementación real, aquí se enviaría la información al servidor
   */
  const handleSaveAsistencia = () => {
    // Aquí iría la lógica para guardar la asistencia
    console.log('Guardar asistencia:', currentAsistencia);
    handleCloseDialog();
  };

  return (
    <Box>
      {/* Encabezado de la página con título y botón para agregar nuevo registro */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Registro de Asistencia</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Registro
        </Button>
      </Box>

      {/* Contenedor principal con barra de búsqueda y filtros */}
      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {/* Campo de búsqueda con icono */}
          <TextField
            variant="outlined"
            placeholder="Buscar por capacitación o participante..."
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Botón de filtros adicionales */}
          <Button startIcon={<FilterListIcon />} variant="outlined">
            Filtros
          </Button>
        </Box>

        {/* Tabla de registros de asistencia */}
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de asistencia">
            {/* Encabezados de la tabla */}
            <TableHead>
              <TableRow>
                <TableCell>Capacitación</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Participante</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell align="center">Asistió</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            {/* Cuerpo de la tabla con datos paginados */}
            <TableBody>
              {filteredAsistencia
                // Aplica paginación a los datos filtrados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((asistencia) => (
                  <TableRow key={asistencia.id}>
                    <TableCell component="th" scope="row">
                      {asistencia.capacitacion}
                    </TableCell>
                    <TableCell>{asistencia.fecha}</TableCell>
                    <TableCell>{asistencia.participante}</TableCell>
                    <TableCell>{asistencia.tipoParticipante}</TableCell>
                    {/* Muestra un icono según el estado de asistencia */}
                    <TableCell align="center">
                      {asistencia.asistio ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <CancelIcon color="error" />
                      )}
                    </TableCell>
                    {/* Botones de acción para cada registro */}
                    <TableCell align="center">
                      <IconButton 
                        color="secondary" 
                        size="small" 
                        title="Editar"
                        onClick={() => handleOpenDialog(asistencia)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="error" size="small" title="Eliminar">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {/* Mensaje cuando no hay registros que mostrar */}
              {filteredAsistencia.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No se encontraron registros de asistencia
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Componente de paginación para la tabla */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} // Opciones de filas por página
          component="div"
          count={filteredAsistencia.length} // Total de registros
          rowsPerPage={rowsPerPage} // Número actual de filas por página
          page={page} // Página actual
          onPageChange={handleChangePage} // Manejador de cambio de página
          onRowsPerPageChange={handleChangeRowsPerPage} // Manejador de cambio de filas por página
          labelRowsPerPage="Filas por página:" // Etiqueta para filas por página
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`} // Formato personalizado para mostrar rango de registros
        />
      </Paper>

      {/* Diálogo para crear/editar asistencia */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {/* Título del diálogo que cambia según si estamos editando o creando */}
        <DialogTitle>
          {isEditing ? 'Editar Registro de Asistencia' : 'Nuevo Registro de Asistencia'}
        </DialogTitle>
        {/* Contenido del diálogo con separador */}
        <DialogContent dividers>
          {/* Formulario organizado en un grid con espaciado */}
          <Grid container spacing={2}>
            {/* Campo de selección de capacitación */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Capacitación</InputLabel>
                <Select
                  name="capacitacion"
                  value={currentAsistencia.capacitacion}
                  onChange={handleInputChange}
                  label="Capacitación"
                >
                  {/* Opciones de capacitaciones desde los datos de ejemplo */}
                  {capacitaciones.map((capacitacion) => (
                    <MenuItem key={capacitacion} value={capacitacion}>
                      {capacitacion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Campo de fecha */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fecha"
                name="fecha"
                type="date" // Campo de tipo fecha
                value={currentAsistencia.fecha}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }} // Necesario para que la etiqueta no se superponga
              />
            </Grid>
            {/* Campo de selección de participante */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Participante</InputLabel>
                <Select
                  name="participante"
                  value={currentAsistencia.participante}
                  onChange={handleInputChange}
                  label="Participante"
                >
                  {/* Opciones de participantes desde los datos de ejemplo */}
                  {participantes.map((participante) => (
                    <MenuItem key={participante} value={participante}>
                      {participante}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Campo de selección de tipo de participante */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Participante</InputLabel>
                <Select
                  name="tipoParticipante"
                  value={currentAsistencia.tipoParticipante}
                  onChange={handleInputChange}
                  label="Tipo de Participante"
                >
                  {/* Opciones de tipos de participante desde los datos de ejemplo */}
                  {tiposParticipante.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Checkbox para marcar asistencia */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={currentAsistencia.asistio}
                      onChange={handleInputChange}
                      name="asistio"
                    />
                  }
                  label="Asistió"
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        {/* Botones de acción del diálogo */}
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveAsistencia}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Exportación del componente para su uso en otras partes de la aplicación
export default Asistencia;