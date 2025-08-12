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
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';

// Datos de ejemplo para certificados
const certificadosData = [
  {
    id: 1,
    participante: 'Juan Pérez',
    tipoParticipante: 'Empleado',
    capacitacion: 'Curso Seguridad Agrícola',
    fechaEmision: '2023-05-15',
    estado: 'Emitido',
  },
  {
    id: 2,
    participante: 'María López',
    tipoParticipante: 'Empleado',
    capacitacion: 'Curso Seguridad Agrícola',
    fechaEmision: '2023-05-15',
    estado: 'Emitido',
  },
  {
    id: 3,
    participante: 'Carlos Rodríguez',
    tipoParticipante: 'Empleado',
    capacitacion: 'Manejo de Plaguicidas',
    fechaEmision: '2023-05-20',
    estado: 'Pendiente',
  },
  {
    id: 4,
    participante: 'Roberto Gómez',
    tipoParticipante: 'Contratista',
    capacitacion: 'Buenas Prácticas Agrícolas',
    fechaEmision: '2023-05-22',
    estado: 'Emitido',
  },
];

// Datos de ejemplo para formularios
const capacitaciones = ['Curso Seguridad Agrícola', 'Manejo de Plaguicidas', 'Buenas Prácticas Agrícolas'];
const participantes = ['Juan Pérez', 'María López', 'Roberto Gómez', 'Carlos Rodríguez', 'Laura Martínez'];
const tiposParticipante = ['Empleado', 'Contratista', 'Comunidad'];
const estados = ['Emitido', 'Pendiente', 'Anulado'];

const Certificados = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCertificado, setCurrentCertificado] = useState({
    participante: '',
    tipoParticipante: '',
    capacitacion: '',
    fechaEmision: '',
    estado: 'Pendiente',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Filtrar certificados según término de búsqueda
  const filteredCertificados = certificadosData.filter((certificado) =>
    certificado.participante.toLowerCase().includes(searchTerm.toLowerCase()) ||
    certificado.capacitacion.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleOpenDialog = (certificado = null) => {
    if (certificado) {
      setCurrentCertificado(certificado);
      setIsEditing(true);
    } else {
      setCurrentCertificado({
        participante: '',
        tipoParticipante: '',
        capacitacion: '',
        fechaEmision: '',
        estado: 'Pendiente',
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
    setCurrentCertificado({
      ...currentCertificado,
      [name]: value,
    });
  };

  const handleSaveCertificado = () => {
    // Aquí iría la lógica para guardar el certificado
    console.log('Guardar certificado:', currentCertificado);
    handleCloseDialog();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Certificados</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Certificado
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Buscar por participante o capacitación..."
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
          <Table sx={{ minWidth: 650 }} aria-label="tabla de certificados">
            <TableHead>
              <TableRow>
                <TableCell>Participante</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Capacitación</TableCell>
                <TableCell>Fecha Emisión</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCertificados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((certificado) => (
                  <TableRow key={certificado.id}>
                    <TableCell component="th" scope="row">
                      {certificado.participante}
                    </TableCell>
                    <TableCell>{certificado.tipoParticipante}</TableCell>
                    <TableCell>{certificado.capacitacion}</TableCell>
                    <TableCell>{certificado.fechaEmision}</TableCell>
                    <TableCell>
                      <Chip
                        label={certificado.estado}
                        color={
                          certificado.estado === 'Emitido'
                            ? 'success'
                            : certificado.estado === 'Pendiente'
                            ? 'warning'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" size="small" title="Ver certificado">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="primary" size="small" title="Descargar">
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                      <IconButton color="primary" size="small" title="Imprimir">
                        <PrintIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        size="small" 
                        title="Editar"
                        onClick={() => handleOpenDialog(certificado)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredCertificados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No se encontraron certificados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCertificados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>

      {/* Diálogo para crear/editar certificado */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Editar Certificado' : 'Nuevo Certificado'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Participante</InputLabel>
                <Select
                  name="participante"
                  value={currentCertificado.participante}
                  onChange={handleInputChange}
                  label="Participante"
                >
                  {participantes.map((participante) => (
                    <MenuItem key={participante} value={participante}>
                      {participante}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Participante</InputLabel>
                <Select
                  name="tipoParticipante"
                  value={currentCertificado.tipoParticipante}
                  onChange={handleInputChange}
                  label="Tipo de Participante"
                >
                  {tiposParticipante.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Capacitación</InputLabel>
                <Select
                  name="capacitacion"
                  value={currentCertificado.capacitacion}
                  onChange={handleInputChange}
                  label="Capacitación"
                >
                  {capacitaciones.map((capacitacion) => (
                    <MenuItem key={capacitacion} value={capacitacion}>
                      {capacitacion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fecha de Emisión"
                name="fechaEmision"
                type="date"
                value={currentCertificado.fechaEmision}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  name="estado"
                  value={currentCertificado.estado}
                  onChange={handleInputChange}
                  label="Estado"
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
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
            onClick={handleSaveCertificado}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Certificados;