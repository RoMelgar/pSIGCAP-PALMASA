-- Crear base de datos
CREATE DATABASE BDSIGCAP;

-- Crear base de datos
CREATE DATABASE BDSIGCAP;

-- Conectarse a la base de datos (solo en psql)
 \c BDSIGCAP;

-- Tabla de usuarios
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo VARCHAR(100) UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(30) NOT NULL CHECK (rol IN ('administrador', 'instructor', 'consulta')),
    estado BOOLEAN DEFAULT TRUE
);

-- Tabla de empleados
CREATE TABLE Empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    departamento VARCHAR(100),
    cargo VARCHAR(100)
);

-- Tabla de contratistas
CREATE TABLE Contratistas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    empresa VARCHAR(100),
    tipo_servicio VARCHAR(100)
);

-- Tabla de comunidades
CREATE TABLE Comunidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    zona VARCHAR(100)
);

-- Tabla de productores
CREATE TABLE Productores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    contacto VARCHAR(100)
);

-- Tabla de certificaciones
CREATE TABLE Certificaciones (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(100)
);

-- Tabla de fincas
CREATE TABLE Fincas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    zona VARCHAR(100),
    id_productor INTEGER REFERENCES productores(id),
    id_certificacion INTEGER REFERENCES certificaciones(id)
);

-- Tabla de entidades impartidoras
CREATE TABLE Entidades_Impartidoras (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150),
    tipo VARCHAR(50) -- interna, externa
);

-- Tabla de instructores
CREATE TABLE Instructores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    especialidad VARCHAR(100),
    id_entidad INTEGER REFERENCES entidades_impartidoras(id)
);

-- Tabla de capacitaciones
CREATE TABLE Capacitaciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    tematica VARCHAR(100),
    tipo_publico VARCHAR(50), -- empleados, contratistas, comunidades, mixto
    id_entidad INTEGER REFERENCES entidades_impartidoras(id),
    duracion INTEGER CHECK (duracion > 0)
);

-- Tabla de sesiones
CREATE TABLE Sesiones (
    id SERIAL PRIMARY KEY,
    id_capacitacion INTEGER REFERENCES capacitaciones(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora TIME,
    modalidad VARCHAR(50),
    lugar VARCHAR(100),
    id_instructor INTEGER REFERENCES instructores(id)
);

-- Tabla de asistencia
CREATE TABLE Asistencia (
    id SERIAL PRIMARY KEY,
    id_sesion INTEGER REFERENCES sesiones(id) ON DELETE CASCADE,
    id_empleado INTEGER REFERENCES empleados(id),
    id_contratista INTEGER REFERENCES contratistas(id),
    id_comunidad INTEGER REFERENCES comunidades(id),
    estado VARCHAR(20) -- presente, ausente, justificado
);

-- Tabla de certificados
CREATE TABLE Certificados (
    id SERIAL PRIMARY KEY,
    id_empleado INTEGER REFERENCES empleados(id),
    id_capacitacion INTEGER REFERENCES capacitaciones(id),
    nota_final NUMERIC(5,2) CHECK (nota_final BETWEEN 0 AND 100),
    fecha_emision DATE DEFAULT CURRENT_DATE
);

--llenar registros  de las tablas 
--Usuarios
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado) 
VALUES ('cperes', 'ypalacios@yahoo.com', 'P5hX6Syg*A', 'instructor', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado)
VALUES ('morenomanuel', 'pedroromero@yahoo.com', 't(&4eBYXnz', 'instructor', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado) 
VALUES ('eveliocollado', 'blancoindira@hotmail.com', '9)C1JrS9&*', 'administrador', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado) 
VALUES ('elenaescobar', 'martin11@grupo.net', '8_osV6UqaW', 'instructor', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado) 
VALUES ('elias30', 'garayjose-emilio@gmail.com', 'jB4mY6d^)^', 'consulta', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado) 
VALUES ('arcesamuel', 'dulce-mariacastaneda@gaitan.com', 'n^^A6TMdd(', 'instructor', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado)
VALUES ('zacariasfigueroa', 'cynthiamonroy@despacho.com', 'ta*6+SLqgS', 'instructor', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado)
VALUES ('zacarias59', 'julia61@villegas.com', 'L#3qHqTue0', 'instructor', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado) 
VALUES ('mvalentin', 'saldanairma@proyectos.com', 'z(c1Xf!mRe', 'instructor', True);
INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol, estado) 
VALUES ('dulce17', 'alonzogerardo@yahoo.com', '@aDq8@EuT4', 'instructor', True);
---Empleados
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Pablo Diego Franco Núñez', 'Repudiandae', 'Horticulturist, amenity');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Citlali Corona Juárez', 'Iusto', 'Leisure centre manager');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Aurelio Ivonne Aranda Arguello', 'Fugit', 'Development worker, community');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Rodolfo Gregorio Muro', 'Nam', 'Sports therapist');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Guadalupe Camila Romo', 'Excepturi', 'Art therapist');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Diego Octavio Batista Madrid', 'Necessitatibus', 'Land/geomatics surveyor');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Linda Bianca Camacho Valentín', 'Perspiciatis', 'Public relations account executive');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Jacobo Carlota Roque Carrillo', 'Voluptates', 'Research scientist (medical)');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Alfonso Madrid', 'Iusto', 'Designer, furniture');
INSERT INTO Empleados (nombre, departamento, cargo) VALUES ('Socorro Raúl Núñez', 'Tempore', 'Chartered loss adjuster');
--Contratistas
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Arturo Fajardo García', 'PALMASA', 'Capacitación');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Judith Aguilera Calvillo', 'PALMASA', 'Construcción');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Pilar Solano', 'PALMASA', 'Capacitación');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Marisol Minerva Viera Gamboa', 'PALMASA', 'Construcción');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Armando Negrete', 'PALMASA', 'Electricidad');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Francisca Rocío de la Crúz', 'PALMASA', 'Construcción');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Elisa Muñoz', 'PALMASA', 'Construcción');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Andrea Amaya Sotelo', 'PALMASA', 'Capacitación');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Zoé Ferrer', 'PALMASA', 'Electricidad');
INSERT INTO Contratistas (nombre, empresa, tipo_servicio) VALUES ('Miriam Otero Hidalgo', 'PALMASA', 'Capacitación');
--Comunidades
INSERT INTO Comunidades (nombre, zona) VALUES ('La Esperanza', 'Occidente');
INSERT INTO Comunidades (nombre, zona) VALUES ('El Tablón Abajo', 'Norte');
INSERT INTO Comunidades (nombre, zona) VALUES ('San Marcos de la Sierra', 'Occidente');
INSERT INTO Comunidades (nombre, zona) VALUES ('Los Naranjos', 'Sur');
INSERT INTO Comunidades (nombre, zona) VALUES ('Santa Cruz de Yojoa', 'Centro');
INSERT INTO Comunidades (nombre, zona) VALUES ('El Paraíso del Sur', 'Sur');
INSERT INTO Comunidades (nombre, zona) VALUES ('Nueva Armenia', 'Este');
INSERT INTO Comunidades (nombre, zona) VALUES ('El Ocotillo', 'Occidente');
INSERT INTO Comunidades (nombre, zona) VALUES ('Vallecito de Jamastrán', 'Este');
INSERT INTO Comunidades (nombre, zona) VALUES ('San Francisco de Opalaca', 'Occidente');

--Productores
INSERT INTO Productores (nombre, contacto) VALUES ('Ofelia Cordero Hinojosa', '2693-12345');
INSERT INTO Productores (nombre, contacto) VALUES ('Marisol Menéndez Cruz', '8688-0918');
INSERT INTO Productores (nombre, contacto) VALUES ('Sr(a). Luis Fonseca', '6769-9300');
INSERT INTO Productores (nombre, contacto) VALUES ('Hermelinda Natividad Vargas', '7446-6602');
INSERT INTO Productores (nombre, contacto) VALUES ('Evelio Gonzalo Mesa', '91256097');
INSERT INTO Productores (nombre, contacto) VALUES ('María José Arreola', '72992518');
INSERT INTO Productores (nombre, contacto) VALUES ('Eloisa Juan Carlos Salas Carranza', '94264183');
INSERT INTO Productores (nombre, contacto) VALUES ('Julio César Rael Nieto', '1007-4089');
INSERT INTO Productores (nombre, contacto) VALUES ('Dr. Estela Cabán', '2696-11611');
INSERT INTO Productores (nombre, contacto) VALUES ('Cristal Angulo', '4151-1505');
--Certificaciones
INSERT INTO Certificaciones (tipo) VALUES ('Comercio Justo');
INSERT INTO Certificaciones (tipo) VALUES ('ISO 9001');
INSERT INTO Certificaciones (tipo) VALUES ('ISO 9001');
INSERT INTO Certificaciones (tipo) VALUES ('Rainforest');
INSERT INTO Certificaciones (tipo) VALUES ('Orgánica');
INSERT INTO Certificaciones (tipo) VALUES ('Orgánica');
INSERT INTO Certificaciones (tipo) VALUES ('Orgánica');
INSERT INTO Certificaciones (tipo) VALUES ('ISO 9001');
INSERT INTO Certificaciones (tipo) VALUES ('Orgánica');
INSERT INTO Certificaciones (tipo) VALUES ('ISO 9001');
--Fincas
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Montero', 'Este', 4, 6);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Domínguez', 'Norte', 4, 10);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Alarcón', 'Sur', 4, 3);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Godoy', 'Oeste', 2, 2);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Navarrete', 'Este', 9, 8);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Batista', 'Norte', 5, 9);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Ybarra', 'Este', 2, 9);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Collazo', 'Este', 9, 4);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Franco', 'Este', 8, 2);
INSERT INTO Fincas (nombre, zona, id_productor, id_certificacion) VALUES ('Acosta', 'Oeste', 6, 10);
--Entidades Impartidoras
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Laboratorios Castañeda y Aguilar', 'interna');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Corporacin Alvarado, Zedillo y Gonzales', 'externa');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Grupo Rendón-Carreón', 'interna');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Montañez y Holguín S.A.', 'interna');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Frías S.A. de C.V.', 'interna');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Rojas-Loya S.A. de C.V.', 'interna');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Enríquez-Villaseñor A.C.', 'externa');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Tejeda-Vera', 'externa');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Grupo Ocampo, Contreras y Castillo', 'interna');
INSERT INTO Entidades_Impartidoras (nombre, tipo) VALUES ('Corporacin Sauceda y Guerra', 'interna');
--Instructores
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Dulce María Guillermo Nieves', 'Ambiental', 3);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Wilfrido Arredondo', 'Agronomía', 1);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Ruby Alejandra Orta', 'Agronomía', 9);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Antonia Centeno Peres', 'Ambiental', 7);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Paulina Lorena Collado Villareal', 'Ambiental', 9);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Héctor Mota', 'Gestión', 9);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Felix Rael Negrón', 'Agronomía', 4);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Sr(a). José Manuél Paredes', 'Ambiental', 10);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('Lorena Mayorga Quintana', 'Gestión', 10);
INSERT INTO Instructores (nombre, especialidad, id_entidad) VALUES ('José Emilio Guadalupe Rodríguez', 'Gestión', 8);
--Capacitaciones
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion)
VALUES ('array direccional descentralizado', 'Producción', 'comunidades', 2, 11);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('previsión coherente total', 'Seguridad', 'empleados', 8, 19);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('línea segura basado en contenido progresivo', 'Seguridad', 'comunidades', 4, 8);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('interfaz direccional preventivo', 'Sostenibilidad', 'comunidades', 2, 8);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('aprovechar didáctica innovador', 'Producción', 'contratistas', 6, 14);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion)
VALUES ('middleware local robusto', 'Sostenibilidad', 'empleados', 3, 8);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('colaboración maximizada enfocado a la calidad', 'Sostenibilidad', 'empleados', 1, 4);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('estandarización bifurcada realineado', 'Seguridad', 'contratistas', 10, 19);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('data-warehouse homogénea adaptativo', 'Sostenibilidad', 'mixto', 2, 12);
INSERT INTO Capacitaciones (titulo, tematica, tipo_publico, id_entidad, duracion) 
VALUES ('caja de herramientas nueva generación enfocado a la calidad', 'Sostenibilidad', 'empleados', 10, 1);
--Sesiones
-- Sesiones con lugares realistas en Honduras
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (4, '2025-01-04', '16:01:30', 'Presencial', 'San Camilo, Intibucá', 2);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (8, '2025-04-27', '05:18:27', 'Presencial', 'El Paraíso, Copán', 1);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (1, '2025-07-03', '10:02:31', 'Virtual', 'San Esteban, Olancho', 10);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (2, '2025-06-07', '15:13:36', 'Virtual', 'Nueva Granada, Choluteca', 2);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (4, '2025-01-16', '07:02:42', 'Presencial', 'San Lorenzo, Valle', 5);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (6, '2025-06-03', '05:00:55', 'Virtual', 'Catacamas, Olancho', 3);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (1, '2025-04-21', '03:58:55', 'Virtual', 'Nueva Armenia, Atlántida', 1);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (10, '2025-01-28', '03:27:53', 'Presencial', 'Gracias, Lempira', 7);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (4, '2025-05-13', '11:59:35', 'Virtual', 'La Esperanza, Intibucá', 6);
INSERT INTO Sesiones (id_capacitacion, fecha, hora, modalidad, lugar, id_instructor) 
VALUES (8, '2025-06-11', '07:58:43', 'Presencial', 'San Nicolás, Santa Bárbara', 4);

--Asistencia
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (1, 3, 3, 6, 'justificado');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (5, 2, 10, 8, 'justificado');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (3, 1, 8, 7, 'justificado');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (9, 5, 6, 7, 'justificado');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (5, 3, 9, 1, 'ausente');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (2, 6, 1, 9, 'ausente');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (3, 4, 8, 6, 'justificado');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (5, 6, 10, 10, 'presente');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (5, 7, 7, 2, 'presente');
INSERT INTO Asistencia (id_sesion, id_empleado, id_contratista, id_comunidad, estado) VALUES (10, 4, 6, 3, 'presente');
--Certicados
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (4, 8, 75.15, 2025-07-23);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (10, 7, 61.26, 2025-03-23);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (10, 7, 90.89, 2025-02-10);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (1, 3, 77.81, 2025-06-09);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (5, 3, 77.85, 2025-06-06);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (8, 9, 84.16, 2025-04-19);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (1, 1, 79.78, 2025-04-24);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (5, 8, 61.99, 2025-06-21);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (7, 4, 81.94, 2025-05-25);
INSERT INTO Certificados (id_empleado, id_capacitacion, nota_final, fecha_emision) VALUES (2, 3, 99.47, 2025-02-23);

