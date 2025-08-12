import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
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
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Datos de ejemplo para empleados
const empleadosData = [
  {
    id: 1,
    codigo: 'EMP001',
    nombre: 'Juan',
    apellido: 'Pérez',
    departamento: 'Producción',
    cargo: 'Supervisor',
    email: 'juan.perez@palmasa.com',
    telefono: '9988-7766',
  },
  {
    id: 2,
    codigo: 'EMP002',
    nombre: 'María',
    apellido: 'López',
    departamento: 'Administración',
    cargo: 'Asistente',
    email: 'maria.lopez@palmasa.com',
    telefono: '9977-6655',
  },
  {
    id: 3,
    codigo: 'EMP003',
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    departamento: 'Calidad',
    cargo: 'Analista',
    email: 'carlos.rodriguez@palmasa.com',
    telefono: '9966-5544',
  },
];

// Datos de ejemplo para contratistas
const contratistasData = [
  {
    id: 1,
    nombre: 'Roberto',
    apellido: 'Gómez',
    empresa: 'Servicios Agrícolas S.A.',
    tipoServicio: 'Mantenimiento',
    email: 'roberto@serviciosagricolas.com',
    telefono: '9955-4433',
  },
  {
    id: 2,
    nombre: 'Laura',
    apellido: 'Martínez',
    empresa: 'Transportes del Norte',
    tipoServicio: 'Transporte',
    email: 'laura@transportesnorte.com',
    telefono: '9944-3322',
  },
];

// Datos de ejemplo para comunidades
const comunidadesData = [
  {
    id: 1,
    nombre: 'El Progreso',
    zona: 'Norte',
    descripcion: 'Comunidad cercana a la finca principal',
  },
  {
    id: 2,
    nombre: 'Nueva Esperanza',
    zona: 'Este',
    descripcion: 'Comunidad de productores independientes',
  },
];

// Datos de ejemplo para formularios
const departamentos = ['Producción', 'Administración', 'Calidad', 'Logística', 'Recursos Humanos'];
const cargos = ['Supervisor', 'Asistente', 'Analista', 'Operario', 'Gerente'];
const empresas = ['Servicios Agrícolas S.A.', 'Transportes del Norte', 'Consultores Ambientales'];
const tiposServicio = ['Mantenimiento', 'Transporte', 'Consultoría', 'Seguridad'];
const zonas = ['Norte', 'Sur', 'Este', 'Oeste', 'Central'];

const Personas = () => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Determinar qué datos mostrar según la pestaña seleccionada
  const getTabData = () => {
    switch (tabValue) {
      case 0: // Empleados
        return empleadosData.filter(
          (empleado) =>
            empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empleado.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            empleado.codigo.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 1: // Contratistas
        return contratistasData.filter(
          (contratista) =>
            contratista.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contratista.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contratista.empresa.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 2: // Comunidades
        return comunidadesData.filter(
          (comunidad) =>
            comunidad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comunidad.zona.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return [];
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
    setSearchTerm('');
  };

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

  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      // Inicializar objeto según la pestaña seleccionada
      switch (tabValue) {
        case 0: // Empleados
          setCurrentItem({
            codigo: '',
            nombre: '',
            apellido: '',
            departamento: '',
            cargo: '',
            email: '',
            telefono: '',
          });
          break;
        case 1: // Contratistas
          setCurrentItem({
            nombre: '',
            apellido: '',
            empresa: '',
            tipoServicio: '',
            email: '',
            telefono: '',
          });
          break;
        case 2: // Comunidades
          setCurrentItem({
            nombre: '',
            zona: '',
            descripcion: '',
          });
          break;
        default:
          setCurrentItem({});
      }
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: value,
    });
  };

  const handleSaveItem = () => {
    // Aquí iría la lógica para guardar el elemento según la pestaña
    console.log('Guardar elemento:', currentItem, 'Tipo:', ['Empleado', 'Contratista', 'Comunidad'][tabValue]);
    handleCloseDialog();
  };

  // Renderizar tabla según la pestaña seleccionada
  const renderTable = () => {
    const data = getTabData();

    switch (tabValue) {
      case 0: // Empleados
        return (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="tabla de empleados">
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Departamento</TableCell>
                    <TableCell>Cargo</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empleado) => (
                    <TableRow key={empleado.id}>
                      <TableCell>{empleado.codigo}</TableCell>
                      <TableCell>{empleado.nombre}</TableCell>
                      <TableCell>{empleado.apellido}</TableCell>
                      <TableCell>{empleado.departamento}</TableCell>
                      <TableCell>{empleado.cargo}</TableCell>
                      <TableCell>{empleado.email}</TableCell>
                      <TableCell>{empleado.telefono}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" size="small" title="Ver detalles">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          color="secondary" 
                          size="small" 
                          title="Editar"
                          onClick={() => handleOpenDialog(empleado)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" size="small" title="Eliminar">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No se encontraron empleados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </>
        );

      case 1: // Contratistas
        return (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="tabla de contratistas">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Tipo de Servicio</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contratista) => (
                    <TableRow key={contratista.id}>
                      <TableCell>{contratista.nombre}</TableCell>
                      <TableCell>{contratista.apellido}</TableCell>
                      <TableCell>{contratista.empresa}</TableCell>
                      <TableCell>{contratista.tipoServicio}</TableCell>
                      <TableCell>{contratista.email}</TableCell>
                      <TableCell>{contratista.telefono}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" size="small" title="Ver detalles">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          color="secondary" 
                          size="small" 
                          title="Editar"
                          onClick={() => handleOpenDialog(contratista)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" size="small" title="Eliminar">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No se encontraron contratistas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </>
        );

      case 2: // Comunidades
        return (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="tabla de comunidades">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Zona</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((comunidad) => (
                    <TableRow key={comunidad.id}>
                      <TableCell>{comunidad.nombre}</TableCell>
                      <TableCell>{comunidad.zona}</TableCell>
                      <TableCell>{comunidad.descripcion}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" size="small" title="Ver detalles">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          color="secondary" 
                          size="small" 
                          title="Editar"
                          onClick={() => handleOpenDialog(comunidad)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" size="small" title="Eliminar">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No se encontraron comunidades
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </>
        );

      default:
        return null;
    }
  };

  // Renderizar formulario según la pestaña seleccionada
  const renderForm = () => {
    switch (tabValue) {
      case 0: // Empleados
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Código"
                name="codigo"
                value={currentItem.codigo || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={currentItem.nombre || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={currentItem.apellido || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select
                  name="departamento"
                  value={currentItem.departamento || ''}
                  onChange={handleInputChange}
                  label="Departamento"
                >
                  {departamentos.map((departamento) => (
                    <MenuItem key={departamento} value={departamento}>
                      {departamento}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Cargo</InputLabel>
                <Select
                  name="cargo"
                  value={currentItem.cargo || ''}
                  onChange={handleInputChange}
                  label="Cargo"
                >
                  {cargos.map((cargo) => (
                    <MenuItem key={cargo} value={cargo}>
                      {cargo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={currentItem.email || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={currentItem.telefono || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );

      case 1: // Contratistas
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={currentItem.nombre || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={currentItem.apellido || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Empresa</InputLabel>
                <Select
                  name="empresa"
                  value={currentItem.empresa || ''}
                  onChange={handleInputChange}
                  label="Empresa"
                >
                  {empresas.map((empresa) => (
                    <MenuItem key={empresa} value={empresa}>
                      {empresa}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Servicio</InputLabel>
                <Select
                  name="tipoServicio"
                  value={currentItem.tipoServicio || ''}
                  onChange={handleInputChange}
                  label="Tipo de Servicio"
                >
                  {tiposServicio.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={currentItem.email || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={currentItem.telefono || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );

      case 2: // Comunidades
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={currentItem.nombre || ''}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Zona</InputLabel>
                <Select
                  name="zona"
                  value={currentItem.zona || ''}
                  onChange={handleInputChange}
                  label="Zona"
                >
                  {zonas.map((zona) => (
                    <MenuItem key={zona} value={zona}>
                      {zona}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={currentItem.descripcion || ''}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Personas</Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<UploadFileIcon />}
            sx={{ mr: 2 }}
          >
            Importar
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            {tabValue === 0 ? 'Nuevo Empleado' : tabValue === 1 ? 'Nuevo Contratista' : 'Nueva Comunidad'}
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Empleados" />
          <Tab label="Contratistas" />
          <Tab label="Comunidades" />
        </Tabs>
      </Paper>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            variant="outlined"
            placeholder={`Buscar ${tabValue === 0 ? 'empleado' : tabValue === 1 ? 'contratista' : 'comunidad'}...`}
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

        {renderTable()}
      </Paper>

      {/* Diálogo para crear/editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {isEditing
            ? `Editar ${tabValue === 0 ? 'Empleado' : tabValue === 1 ? 'Contratista' : 'Comunidad'}`
            : `Nuevo ${tabValue === 0 ? 'Empleado' : tabValue === 1 ? 'Contratista' : 'Comunidad'}`}
        </DialogTitle>
        <DialogContent dividers>
          {renderForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSaveItem}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Personas;