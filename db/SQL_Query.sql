-- Eliminar las tablas dependientes primero
IF OBJECT_ID('user_has_roles', 'U') IS NOT NULL
    DROP TABLE user_has_roles;
GO

IF OBJECT_ID('users', 'U') IS NOT NULL
    DROP TABLE users;
GO

IF OBJECT_ID('roles', 'U') IS NOT NULL
    DROP TABLE roles;
GO

IF OBJECT_ID('categories', 'U') IS NOT NULL
    DROP TABLE categories;
GO

IF OBJECT_ID('products', 'U') IS NOT NULL
    DROP TABLE products;
GO

IF OBJECT_ID('product_images', 'U') IS NOT NULL
    DROP TABLE product_images;
GO
--Crear base de datos
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DeliveryDB')
BEGIN
    CREATE DATABASE DeliveryDB;
END
GO

-- Seleccionar la base de datos
USE DeliveryDB;
GO

-- Crear la tabla roles
CREATE TABLE roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    image VARCHAR(MAX) NULL,
    route VARCHAR(MAX) NULL,
    created_at DATETIME NOT NULL, 
    updated_at DATETIME NOT NULL
);
GO

-- Insertar datos en roles
INSERT INTO roles (name, route, created_at, updated_at)
VALUES 
    ('CLIENTE', 'client/products/list', GETDATE(), GETDATE()),
    ('RESTAURANTE', 'restaurant/orders/list', GETDATE(), GETDATE()),
    ('REPARTIDOR', 'delivery/orders/list', GETDATE(), GETDATE());
GO

-- Crear la tabla users
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(MAX) NOT NULL,
    name VARCHAR(30) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    image VARCHAR(MAX) NULL,
    is_available TINYINT NULL,
    session_token VARCHAR(MAX) NULL,
    created_at DATETIME NOT NULL, 
    updated_at DATETIME NOT NULL
);
GO

-- Crear la tabla user_has_roles
CREATE TABLE user_has_roles (
    id_user INT NOT NULL FOREIGN KEY REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    id_rol INT NOT NULL FOREIGN KEY REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at DATETIME NOT NULL, 
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id_user, id_rol)
);
GO

CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(MAX) NOT NULL,
    created_at DATETIME NOT NULL, 
    updated_at DATETIME NOT NULL
);
GO

CREATE TABLE products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(MAX) NOT NULL,
    price DECIMAL(10, 2) DEFAULT 0.0,
    id_category INT NOT NULL FOREIGN KEY REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME NOT NULL DEFAULT GETDATE()
);
GO

CREATE TABLE product_images (
    id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NOT NULL FOREIGN KEY REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    image_url VARCHAR(MAX) NOT NULL,
    publicid VARCHAR(MAX) NOT NULL
);
GO