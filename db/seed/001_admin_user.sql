-- Insert admin user (password: admin123)
-- Hash generated with bcrypt rounds=10
INSERT INTO users (email, password, name, role) 
VALUES (
  'admin@example.com',
  '$2b$10$5nzn75kR079EE/OS94RDp.OR4wRbis.HFQSmjB3ikGQ2BaFIpo7OC',
  'Super Admin',
  'super_admin'
) ON CONFLICT (email) DO NOTHING;