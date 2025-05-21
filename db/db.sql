use drinknow;

CREATE TABLE users(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(180) NOT NULL,
birthdate DATE NOT NULL,
document BIGINT NOT NULL UNIQUE,
email VARCHAR(180) NOT NULL UNIQUE,
password VARCHAR(90) NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
updated_at TIMESTAMP(0) NOT NULL,
address VARCHAR(255);

);



CREATE TABLE roles (
	id bigint primary key auto_increment,
    name varchar(90) not null unique,
    image varchar(255) null,
    route varchar(180) not null,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null
);

INSERT INTO roles (name, route, created_at, updated_at)
VALUES 
  ('ESTANCO', '/liquor_store/orders/list', '2025-05-11', '2025-05-11'),
  ('DOMICILIARIO', '/delivery/orders/list', '2025-05-11', '2025-05-11'),
  ('CLIENTE', '/client/products/list', '2025-05-11', '2025-05-11'),
  ('ADMIN', '/admin/admin/list', '2025-05-11', '2025-05-11');

CREATE TABLE user_hash_roles (
	id_user bigint NOT NULL,
    id_rol bigint NOT NULL,
    created_at timestamp(0) not null,
    updated_at timestamp(0) not null,
    FOREIGN KEY (id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_user, id_rol)
);

