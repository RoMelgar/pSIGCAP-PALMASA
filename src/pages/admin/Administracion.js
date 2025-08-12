import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';

// Iconos
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';

// Datos de ejemplo para usuarios
const usuariosData = [
  { id: 1, nombre: 'Admin', email: 'admin@palmasa.com', rol: 'Administrador', activo: true },
 
];

// Datos de ejemplo para roles
const rolesData = [
  { id: 1, nombre: 'Administrador', descripcion: 'Acceso completo al sistema', permisos: 'Todos' },
  { id: 2, nombre: 'Capacitador', descripcion: 'Gestión de capacitaciones y asistencia', permisos: 'Capacitaciones, Asistencia, Certificados' },
  { id: 3, nombre: 'Asistente', descripcion: 'Registro de asistencia y emisión de certificados', permisos: 'Asistencia, Certificados (lectura)' },
];

// Datos de ejemplo para categorías
const categoriasData = [
  { id: 1, nombre: 'Seguridad', descripcion: 'Capacitaciones relacionadas con seguridad laboral' },
  { id: 2, nombre: 'Técnica', descripcion: 'Capacitaciones técnicas específicas del sector' },
  { id: 3, nombre: 'Ambiental', descripcion: 'Capacitaciones sobre temas ambientales y sostenibilidad' },
  { id: 4, nombre: 'Salud', descripcion: 'Capacitaciones relacionadas con salud ocupacional' },
];

const Administracion = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);
  
  // Estados para formularios
  const [formUsuario, setFormUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: '',
    activo: true,
  });
  
  const [formRol, setFormRol] = useState({
    nombre: '',
    descripcion: '',
    permisos: [],
  });
  
  const [formCategoria, setFormCategoria] = useState({
    nombre: '',
    descripcion: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    if (item) {
      // Editar existente
      setCurrentItem(item);
      switch (type) {
        case 'usuario':
          setFormUsuario({
            nombre: item.nombre,
            email: item.email,
            password: '',
            rol: item.rol,
            activo: item.activo,
          });
          break;
        case 'rol':
          setFormRol({
            nombre: item.nombre,
            descripcion: item.descripcion,
            permisos: item.permisos.split(', '),
          });
          break;
        case 'categoria':
          setFormCategoria({
            nombre: item.nombre,
            descripcion: item.descripcion,
          });
          break;
        default:
          break;
      }
    } else {
      // Crear nuevo
      setCurrentItem(null);
      switch (type) {
        case 'usuario':
          setFormUsuario({
            nombre: '',
            email: '',
            password: '',
            rol: '',
            activo: true,
          });
          break;
        case 'rol':
          setFormRol({
            nombre: '',
            descripcion: '',
            permisos: [],
          });
          break;
        case 'categoria':
          setFormCategoria({
            nombre: '',
            descripcion: '',
          });
          break;
        default:
          break;
      }
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUsuarioChange = (e) => {
    const { name, value, checked } = e.target;
    setFormUsuario({
      ...formUsuario,
      [name]: name === 'activo' ? checked : value,
    });
  };

  const handleRolChange = (e) => {
    const { name, value } = e.target;
    setFormRol({
      ...formRol,
      [name]: value,
    });
  };

  const handleCategoriaChange = (e) => {
    const { name, value } = e.target;
    setFormCategoria({
      ...formCategoria,
      [name]: value,
    });
  };

  const handleSaveItem = () => {
    // Aquí iría la lógica para guardar el elemento según el tipo
    console.log('Guardar elemento:', dialogType, currentItem ? 'editar' : 'nuevo');
    switch (dialogType) {
      case 'usuario':
        console.log(formUsuario);
        break;
      case 'rol':
        console.log(formRol);
        break;
      case 'categoria':
        console.log(formCategoria);
        break;
      default:
        break;
    }
    handleCloseDialog();
  };

  const handleDeleteItem = (type, id) => {
    // Aquí iría la lógica para eliminar el elemento
    console.log('Eliminar elemento:', type, id);
  };

  // Renderizado de formularios según el tipo
  const renderDialogContent = () => {
    switch (dialogType) {
      case 'usuario':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formUsuario.nombre}
                onChange={handleUsuarioChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formUsuario.email}
                onChange={handleUsuarioChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type="password"
                value={formUsuario.password}
                onChange={handleUsuarioChange}
                helperText={currentItem ? "Dejar en blanco para mantener la contraseña actual" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="rol"
                  value={formUsuario.rol}
                  onChange={handleUsuarioChange}
                  label="Rol"
                >
                  {rolesData.map((rol) => (
                    <MenuItem key={rol.id} value={rol.nombre}>
                      {rol.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formUsuario.activo}
                    onChange={handleUsuarioChange}
                    name="activo"
                    color="primary"
                  />
                }
                label="Usuario activo"
              />
            </Grid>
          </Grid>
        );
      case 'rol':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del Rol"
                name="nombre"
                value={formRol.nombre}
                onChange={handleRolChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={formRol.descripcion}
                onChange={handleRolChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Permisos</InputLabel>
                <Select
                  multiple
                  name="permisos"
                  value={formRol.permisos}
                  onChange={handleRolChange}
                  label="Permisos"
                >
                  <MenuItem value="Capacitaciones">Capacitaciones</MenuItem>
                  <MenuItem value="Personas">Personas</MenuItem>
                  <MenuItem value="Asistencia">Asistencia</MenuItem>
                  <MenuItem value="Certificados">Certificados</MenuItem>
                  <MenuItem value="Reportes">Reportes</MenuItem>
                  <MenuItem value="Administración">Administración</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 'categoria':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de la Categoría"
                name="nombre"
                value={formCategoria.nombre}
                onChange={handleCategoriaChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={formCategoria.descripcion}
                onChange={handleCategoriaChange}
                multiline
                rows={2}
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
      <Typography variant="h4" sx={{ mb: 3 }}>
        Administración del Sistema
      </Typography>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<PersonIcon />} label="Usuarios" />
          <Tab icon={<SecurityIcon />} label="Roles y Permisos" />
          <Tab icon={<CategoryIcon />} label="Categorías" />
          <Tab icon={<SettingsIcon />} label="Configuración" />
        </Tabs>
      </Paper>

      {/* Contenido de la pestaña Usuarios */}
      {tabValue === 0 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Gestión de Usuarios</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('usuario')}
            >
              Nuevo Usuario
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuariosData.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.rol}</TableCell>
                    <TableCell>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpenDialog('usuario', usuario)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteItem('usuario', usuario.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Contenido de la pestaña Roles */}
      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Roles y Permisos</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('rol')}
            >
              Nuevo Rol
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Permisos</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rolesData.map((rol) => (
                  <TableRow key={rol.id}>
                    <TableCell>{rol.nombre}</TableCell>
                    <TableCell>{rol.descripcion}</TableCell>
                    <TableCell>{rol.permisos}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpenDialog('rol', rol)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteItem('rol', rol.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Contenido de la pestaña Categorías */}
      {tabValue === 2 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Categorías de Capacitaciones</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('categoria')}
            >
              Nueva Categoría
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriasData.map((categoria) => (
                  <TableRow key={categoria.id}>
                    <TableCell>{categoria.nombre}</TableCell>
                    <TableCell>{categoria.descripcion}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpenDialog('categoria', categoria)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDeleteItem('categoria', categoria.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Contenido de la pestaña Configuración */}
      {tabValue === 3 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Configuración del Sistema
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nombre de la Empresa"
                defaultValue="PALMASA"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email de Contacto"
                defaultValue="contacto@palmasa.com"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Enviar notificaciones por email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Generar certificados automáticamente"
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button variant="contained" color="primary">
                Guardar Configuración
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Diálogo para crear/editar elementos */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentItem
            ? `Editar ${dialogType === 'usuario' ? 'Usuario' : dialogType === 'rol' ? 'Rol' : 'Categoría'}`
            : `Nuevo ${dialogType === 'usuario' ? 'Usuario' : dialogType === 'rol' ? 'Rol' : 'Categoría'}`}
        </DialogTitle>
        <DialogContent dividers>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleSaveItem}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Administracion;