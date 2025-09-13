CREATE DATABASE IF NOT EXISTS sistema_reservas;
USE sistema_reservas;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('cliente', 'admin') DEFAULT 'cliente'
);

CREATE TABLE Habitacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    estado ENUM('disponible','ocupada','mantenimiento') DEFAULT 'disponible'
);

CREATE TABLE Reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    habitacion_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('pendiente','confirmada','cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (habitacion_id) REFERENCES Habitacion(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo VARCHAR(50) NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES Reserva(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
