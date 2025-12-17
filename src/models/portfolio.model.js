const db = require('../config/database');

class PortfolioModel {
  static async getAll(isActive = null) {
    let query = 'SELECT * FROM portfolios';
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
    const result = await db.query('SELECT * FROM portfolios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(portfolioData) {
    const { title, description, client_name, project_url, image, tags, order, created_by } = portfolioData;
    const result = await db.query(
      `INSERT INTO portfolios (title, description, client_name, project_url, image, tags, "order", created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [title, description, client_name, project_url, image, JSON.stringify(tags), order || 0, created_by]
    );
    return result.rows[0];
  }

  static async update(id, portfolioData) {
    const { title, description, client_name, project_url, image, tags, is_active, order } = portfolioData;
    const result = await db.query(
      `UPDATE portfolios 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           client_name = COALESCE($3, client_name),
           project_url = COALESCE($4, project_url),
           image = COALESCE($5, image),
           tags = COALESCE($6, tags),
           is_active = COALESCE($7, is_active),
           "order" = COALESCE($8, "order")
       WHERE id = $9 
       RETURNING *`,
      [title, description, client_name, project_url, image, tags ? JSON.stringify(tags) : null, is_active, order, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM portfolios WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }
}

module.exports = PortfolioModel;