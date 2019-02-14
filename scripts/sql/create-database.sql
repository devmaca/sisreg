CREATE DATABASE IF NOT EXISTS limon;

USE limon;

-- *****************************************
-- Eliminar las tablas de la base de datos
SET FOREIGN_KEY_CHECKS = 0;
SET GROUP_CONCAT_MAX_LEN=32768;
SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_name, '`') INTO @tables
FROM information_schema.tables
WHERE table_schema = (SELECT DATABASE());
SELECT IFNULL(@tables,'dummy') INTO @tables;

SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;

-- ******************
-- Crear las tablas
CREATE TABLE roles(
  id_rol		int AUTO_INCREMENT,
  rol			VARCHAR(20),
  PRIMARY KEY (id_rol)
);

CREATE TABLE director(
  id_director int AUTO_INCREMENT,
  ci			int(12),
  PRIMARY KEY (id_director)
);

CREATE TABLE administrador(
  id_administrador	int AUTO_INCREMENT,
  ci			int(50),
  PRIMARY KEY (id_administrador)
);

CREATE TABLE tutor(
  id_tutor int (10),
  ci		int(20),
  PRIMARY KEY (id_tutor)
);

CREATE TABLE personas(
  id_persona		int AUTO_INCREMENT,
  nombres		VARCHAR(25),
  paterno		VARCHAR(25),
  materno		VARCHAR(20),
  ci 			INT(10),
  direccion		VARCHAR(50),
  telefono		INT(20),
  genero			CHAR(1),
  fecha_nac		VARCHAR(10),
  user			VARCHAR(10),
  pass			VARCHAR(10),
  rol			VARCHAR(20),
  PRIMARY KEY (id_persona)
);

CREATE TABLE cursos(
  id_curso		int AUTO_INCREMENT,
  nivel			VARCHAR(12),
  paralelo		VARCHAR(12),
  curso     VARCHAR(64),
  PRIMARY KEY (id_curso)
);

CREATE TABLE gestion(
  id_gestion		int AUTO_INCREMENT,
  year			VARCHAR(12),
  PRIMARY KEY (id_gestion)
);

CREATE TABLE materias(
  id_materia		int AUTO_INCREMENT,
  area			VARCHAR(50),
  PRIMARY KEY (id_materia)
);

CREATE TABLE estudiantes(
  id_estudiante int AUTO_INCREMENT,
  id_persona	int(10),
  rude		int(10),
  id_curso	int(12),
  PRIMARY KEY (id_estudiante)
);

CREATE TABLE docentes(
  id_docente	int AUTO_INCREMENT,
  RDA			int(10),
  PRIMARY KEY (id_docente)
);

CREATE TABLE imparte(
  id_imparte int AUTO_INCREMENT,
  id_docente int(10),
  materia1	int(10),
  materia2	int(10),
  materia3	int(10),
  materia4 	int(10),
  materia5 	int(10),
  gestion	int(10),
  PRIMARY KEY (id_imparte)
);

CREATE TABLE calificaciones(
  id_calificacion int AUTO_INCREMENT,
  nota		int(5),
  bimestre	int(10),
  id_materia	int(10),
  id_gestion	int(10),
  id_estudiante	int(10),
  PRIMARY KEY (id_calificacion),
  FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
  FOREIGN KEY (id_gestion) REFERENCES gestion(id_gestion),
  FOREIGN KEY (id_materia) REFERENCES materias(id_materia)
);

CREATE TABLE horario(
  id_horario int AUTO_INCREMENT,
  dia			VARCHAR(10),
  hora_inicio	VARCHAR(10),
  hora_fin	VARCHAR(10),
  id_materia	INT(10),
  gestion 	INT(10),
  id_curso	INT(10),
  PRIMARY KEY (id_horario),
  FOREIGN KEY (id_materia) REFERENCES materias(id_materia),
  FOREIGN KEY (gestion) REFERENCES gestion(id_gestion),
  FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
);

CREATE TABLE conducta(
  id_horario int AUTO_INCREMENT,
  descripcion VARCHAR(50),
  id_estudiante  int(10),
  id_docente 		int(10),
  PRIMARY KEY (id_horario),
  FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
  FOREIGN KEY (id_docente) REFERENCES docentes(id_docente)
);

CREATE TABLE tutoria(
  id_tutor	int(10),
  id_estudiante int(10),
  FOREIGN KEY (id_tutor) REFERENCES tutor(id_tutor),
  FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante)
);

-- **********************************
-- Insertando registros predefinidos
INSERT INTO roles (rol) VALUES ('director');
INSERT INTO roles (rol) VALUES ('administrador') ;

INSERT INTO cursos (nivel,paralelo,curso) VALUES ('primero','A','Inicial -Primero - A') ;

INSERT INTO gestion (year) VALUES ('2018') ;

-- *******************************
-- Insertando registros de prueba
INSERT INTO personas (nombres,paterno,materno,ci,direccion,telefono,genero,fecha_nac,user,pass,rol) VALUES
('Administrador','Paterno','Materno','000000','Yacuiba','4123456',1,'01/01/2000','admin','Developer','ADMINISTRADOR');
INSERT INTO administrador (ci) VALUES
('000000');

-- *******************
-- Consultas de prueba
SELECT '***************';
SELECT id_administrador,id_persona,nombres,paterno,materno FROM personas p,administrador a where p.ci=a.ci;
--ALTER TABLE calificaciones ADD