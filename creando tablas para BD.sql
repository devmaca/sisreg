CREATE TABLE persona
(id_persona		NUMBER(12),
 nombres		VARCHAR(25),
 paterno		VARCHAR(25),
 materno		VARCHAR(20),
 ci 			NUMBER(10),
 direccion		VARCHAR(50),
 telefono		NUMBER(20),
 genero			NUMBER(1),
 fecha_nac		VARCHAR(10),
 PRIMARY KEY (id_persona)
);

CREATE TABLE users
(id	 			NUMBER(10) NOT NULL,
 user			VARCHAR(12),
 pass			VARCHAR(12),
 id_persona		NUMBER(12),
 PRIMARY KEY (id),
 FOREIGN KEY (id_persona) REFERENCES persona (id_persona));


CREATE TABLE estudiante
(id_estudiante 		NUMBER(12),
 id_persona		NUMBER(12),
 
 PRIMARY KEY (id_estudiante),
 FOREIGN KEY (id_persona) REFERENCES persona (id_persona));

CREATE TABLE administrador
(id_administrador	NUMBER(12),
 id_persona		NUMBER(12),
 
 PRIMARY KEY (id_administrador),
 FOREIGN KEY (id_persona) REFERENCES persona (id_persona));

CREATE TABLE docente
(id_docente 	NUMBER(12),
 id_persona		NUMBER(12),
 
 PRIMARY KEY (id_docente),
 FOREIGN KEY (id_persona) REFERENCES persona (id_persona));

CREATE TABLE tutor
(id_tutor 		NUMBER(12),
 id_persona		NUMBER(12),
 
 PRIMARY KEY (id_tutor),
 FOREIGN KEY (id_persona) REFERENCES persona (id_persona));

CREATE TABLE director
(id_director 	NUMBER(12),
 id_persona		NUMBER(12),
 
 PRIMARY KEY (id_director),
 FOREIGN KEY (id_persona) REFERENCES persona (id_persona));

INSERT INTO persona VALUES (1,'Miguel Alfredo','Condori','ALejo',123456789,'Av.libertadores/esq potosi',76824901,'1','09-ENE-1955') ;
