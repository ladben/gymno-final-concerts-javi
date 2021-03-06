CREATE TABLE If NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  lastname VARCHAR(45) NOT NULL,
  firstname VARCHAR(45) NOT NULL,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id, username),
  UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE);