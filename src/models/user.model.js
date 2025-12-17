const db = require('../config/database');

class UserModel {
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(userData) {
    const { email, password, name, role } = userData;
    const result = await db.query(
      `INSERT INTO users (email, password, name, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, name, role, is_active, created_at`,
      [email, password, name, role || 'admin']
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await db.query(
      'SELECT id, email, name, role, is_active, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async update(id, userData) {
    const { name, role, is_active } = userData;
    const result = await db.query(
      `UPDATE users 
       SET name = COALESCE($1, name), 
           role = COALESCE($2, role), 
           is_active = COALESCE($3, is_active)
       WHERE id = $4 
       RETURNING id, email, name, role, is_active, updated_at`,
      [name, role, is_active, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }
}

module.exports = UserModel;