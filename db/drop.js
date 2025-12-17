const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function dropTables() {
  try {
    console.log('🗑️  Dropping all tables...');
    
    await pool.query(`
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS portfolios CASCADE;
      DROP TABLE IF EXISTS services CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
    `);
    
    console.log('✅ All tables dropped successfully');
  } catch (error) {
    console.error('❌ Drop failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

dropTables();