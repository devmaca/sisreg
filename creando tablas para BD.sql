CREATE DATABASE Limon;

CREATE TABLE roles(
id_rol		int AUTO_INCREMENT,
rol			VARCHAR(20),
PRIMARY KEY (id_rol)
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
 users			VARCHAR(10),
 pass			VARCHAR(10),
 rol			VARCHAR(20),
 PRIMARY KEY (id_persona)
);

CREATE TABLE cursos(
 id_curso		int AUTO_INCREMENT,
 nivel			VARCHAR(12),
 paralelo		VARCHAR(12),
 PRIMARY KEY (id_curso)
 );

CREATE TABLE gestion(
id_gestion		int AUTO_INCREMENT,
year			VARCHAR(12),
PRIMARY KEY (id_gestion)
 );


INSERT INTO roles (rol) VALUES ('director');
INSERT INTO roles (rol) VALUES ('administrador') ;


INSERT INTO cursos (nivel,paralelo) VALUES ('primero','A') ;
INSERT INTO gestion (year) VALUES ('2018') ;

SELECT id_persona,nombres,paterno,materno,id_administrador FROM personas,administrador where personas.ci=administrador.ci
