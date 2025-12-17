const db = require('../config/database');

class ProjectModel {
  static async getAll(status = null) {
    let query = 'SELECT * FROM projects';
    const params = [];
    
    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await db.query(query, params);
    return result.rows;
  }

  static async findById(id) {
    const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(projectData) {
    const { client_name, client_email, client_phone, service_type, description, budget, deadline, attachments } = projectData;
    const result = await db.query(
      `INSERT INTO projects (client_name, client_email, client_phone, service_type, description, budget, deadline, attachments) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [client_name, client_email, client_phone, service_type, description, budget, deadline, attachments ? JSON.stringify(attachments) : null]
    );
    return result.rows[0];
  }

  static async update(id, projectData) {
    const { status, notes, assigned_to, budget, deadline } = projectData;
    const result = await db.query(
      `UPDATE projects 
       SET status = COALESCE($1, status),
           notes = COALESCE($2, notes),
           assigned_to = COALESCE($3, assigned_to),
           budget = COALESCE($4, budget),
           deadline = COALESCE($5, deadline)
       WHERE id = $6 
       RETURNING *`,
      [status, notes, assigned_to, budget, deadline, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }
}

module.exports = ProjectModel;