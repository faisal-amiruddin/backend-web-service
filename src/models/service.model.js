const db = require('../config/database');

class ServiceModel {
  static async getAll(isActive = null) {
    let query = 'SELECT * FROM services';
    const params = [];
    
    if (isActive !== null) {
      query += ' WHERE is_active = $1';
      params.push(isActive);
    }
    
    query += ' ORDER BY "order" ASC, created_at DESC';
    
    const result = await db.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM services WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(serviceData) {
    const { name, description, price, features, image, order, created_by } = serviceData;
    const result = await db.query(
      `INSERT INTO services (name, description, price, features, image, "order", created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, description, price, JSON.stringify(features), image, order || 0, created_by]
    );
    return result.rows[0];
  }

  static async update(id, serviceData) {
    const { name, description, price, features, image, is_active, order } = serviceData;
    const result = await db.query(
      `UPDATE services 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           price = COALESCE($3, price),
           features = COALESCE($4, features),
           image = COALESCE($5, image),
           is_active = COALESCE($6, is_active),
           "order" = COALESCE($7, "order")
       WHERE id = $8 
       RETURNING *`,
      [name, description, price, features ? JSON.stringify(features) : null, image, is_active, order, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM services WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }
}

module.exports = ServiceModel;