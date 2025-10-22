-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  department_id INTEGER NOT NULL REFERENCES departments(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interests table
CREATE TABLE IF NOT EXISTS interests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  organization VARCHAR(255),
  message TEXT,
  department_id INTEGER REFERENCES departments(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interest Products (junction table for many-to-many relationship)
CREATE TABLE IF NOT EXISTS interest_products (
  id SERIAL PRIMARY KEY,
  interest_id INTEGER NOT NULL REFERENCES interests(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_department_id ON products(department_id);
CREATE INDEX IF NOT EXISTS idx_interests_email ON interests(email);
CREATE INDEX IF NOT EXISTS idx_feedbacks_rating ON feedbacks(rating);
