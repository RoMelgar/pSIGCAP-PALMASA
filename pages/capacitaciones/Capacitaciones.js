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
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// Iconos
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';

// Datos de ejemplo para capacitaciones
const capacitacionesData = [
  {
    id: 1,
    titulo: 'Curso Seguridad Agrícola',
    tematica: 'Seguridad',
    tipoPublico: 'Empleados',
    entidad: 'PALMASA',
    duracion: 16,
    estado: 'Activo',
  },
  {
    id: 2,
    titulo: 'Manejo de Plaguicidas',
    tematica: 'Agricultura',
    tipoPublico: 'Contratistas',
    entidad: 'Ministerio de Agricultura',
    duracion: 8,
    estado: 'Activo',
  },
  {
    id: 3,
    titulo: 'Buenas Prácticas Agrícolas',
    tematica: 'Agricultura',
    tipoPublico: 'Empleados',
    entidad: 'PALMASA',
    duracion: 24,
    estado: 'Inactivo',
  },
  {
    id: 4,
    titulo: 'Primeros Auxilios',
    tematica: 'Salud',
    tipoPublico: 'Comunidades',
    entidad: 'Cruz Roja',
    duracion: 12,
    estado: 'Activo',
  },
  {
    id: 5,
    titulo: 'Manejo de Residuos',
    tematica: 'Medio Ambiente',
    tipoPublico: 'Empleados',
    entidad: 'PALMASA',
    duracion: 8,
    estado: 'Activo',
  },
];

// Datos de ejemplo para formularios
const tematicas = ['Seguridad', 'Agricultura', 'Salud', 'Medio Ambiente', 'Administración'];
const tiposPublico = ['Empleados', 'Contratistas', 'Comunidades'];
const entidades = ['PALMASA', 'Ministerio de Agricultura', 'Cruz Roja', 'Universidad Nacional'];

const Capacitaciones = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCapacitacion, setCurrentCapacitacion] = useState({
    titulo: '',
    tematica: '',
    tipoPublico: '',
    entidad: '',
    duracion: '',
    estado: 'Activo',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Filtrar capacitaciones según término de búsqueda
  const filteredCapacitaciones = capacitacionesData.filter((capacitacion) =>
    capacitacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    capacitacion.tematica.toLowerCase().includes(searchTerm.toLowerCase()) ||
    capacitacion.tipoPublico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (capacitacion = null) => {
    if (capacitacion) {
      setCurrentCapacitacion(capacitacion);
      setIsEditing(true);
    } else {
      setCurrentCapacitacion({
        titulo: '',
        tematica: '',
        tipoPublico: '',
        entidad: '',
        duracion: '',
        estado: 'Activo',
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCapacitacion({
      ...currentCapacitacion,
      [name]: value,
    });
  };

  const handleSaveCapacitacion = () => {
    // Aquí iría la lógica para guardar la capacitación
    console.log('Guardar capacitación:', currentCapacitacion);
    handleCloseDialog();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Capacitaciones</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nueva Capacitación
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Buscar capacitación..."
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
          <Button startIcon={<FilterListIcon />} variant="outlined">
            Filtros
          </Button>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de capacitaciones">
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Temática</TableCell>
                <TableCell>Tipo de Público</TableCell>
                <TableCell>Entidad</TableCell>
                <TableCell>Duración (horas)</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCapacitaciones
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((capacitacion) => (
                  <TableRow key={capacitacion.id}>
                    <TableCell component="th" scope="row">
                      {capacitacion.titulo}
                    </TableCell>
                    <TableCell>{capacitacion.tematica}</TableCell>
                    <TableCell>{capacitacion.tipoPublico}</TableCell>
                    <TableCell>{capacitacion.entidad}</TableCell>
                    <TableCell>{capacitacion.duracion}</TableCell>
                    <TableCell>
                      <Chip
                        label={capacitacion.estado}
                        color={capacitacion.estado === 'Activo' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" size="small" title="Ver detalles">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        size="small" 
                        title="Editar"
                        onClick={() => handleOpenDialog(capacitacion)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="error" size="small" title="Eliminar">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredCapacitaciones.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No se encontraron capacitaciones
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCapacitaciones.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>

      {/* Diálogo para crear/editar capacitación */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing ? 'Editar Capacitación' : 'Nueva Capacitación'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="titulo"
                value={currentCapacitacion.titulo}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Temática</InputLabel>
                <Select
                  name="tematica"
                  value={currentCapacitacion.tematica}
                  onChange={handleInputChange}
                  label="Temática"
                >
                  {tematicas.map((tematica) => (
                    <MenuItem key={tematica} value={tematica}>
                      {tematica}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Público</InputLabel>
                <Select
                  name="tipoPublico"
                  value={currentCapacitacion.tipoPublico}
                  onChange={handleInputChange}
                  label="Tipo de Público"
                >
                  {tiposPublico.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Entidad Impartidora</InputLabel>
                <Select
                  name="entidad"
                  value={currentCapacitacion.entidad}
                  onChange={handleInputChange}
                  label="Entidad Impartidora"
                >
                  {entidades.map((entidad) => (
                    <MenuItem key={entidad} value={entidad}>
                      {entidad}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duración (horas)"
                name="duracion"
                type="number"
                value={currentCapacitacion.duracion}
                onChange={handleInputChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="estado"
                  value={currentCapacitacion.estado}
                  onChange={handleInputChange}
                  label="Estado"
                >
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Inactivo">Inactivo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveCapacitacion}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Capacitaciones;