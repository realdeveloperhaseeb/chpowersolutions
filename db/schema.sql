-- CH Power Solutions — MySQL schema
-- Run this once on your database (local or Hostinger). Then run `node db/seed.mjs`.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(190) NOT NULL,
  slug         VARCHAR(190) NOT NULL UNIQUE,
  tagline      VARCHAR(255),
  description  TEXT,
  meta_title   VARCHAR(255),
  meta_desc    VARCHAR(320),
  image        VARCHAR(500),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS products (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(190) NOT NULL,
  slug         VARCHAR(190) NOT NULL UNIQUE,
  category_id  INT,
  price        DECIMAL(12,2) NOT NULL DEFAULT 0,
  old_price    DECIMAL(12,2),
  stock        INT NOT NULL DEFAULT 0,
  featured     TINYINT(1) NOT NULL DEFAULT 0,
  short_desc   VARCHAR(500),
  description  TEXT,
  specs        JSON,
  meta_title   VARCHAR(255),
  meta_desc    VARCHAR(320),
  images       JSON,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_product_category FOREIGN KEY (category_id)
    REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(190) NOT NULL,
  email         VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS settings (
  `key`   VARCHAR(100) PRIMARY KEY,
  `value` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orders (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  user_id            INT,
  customer_name      VARCHAR(190) NOT NULL,
  customer_phone     VARCHAR(60) NOT NULL,
  customer_email     VARCHAR(190),
  address            TEXT,
  payment_method     VARCHAR(40) NOT NULL,
  payment_screenshot VARCHAR(500),
  items              JSON,
  total              DECIMAL(12,2) NOT NULL DEFAULT 0,
  status             ENUM('pending','confirmed','rejected','completed') NOT NULL DEFAULT 'pending',
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_order_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
