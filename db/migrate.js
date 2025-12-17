const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function runMigration() {
  try {
    console.log('🔄 Running migration...');
    
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, 'migrations', '001_initial_schema.sql'),
      'utf8'
    );
    
    await pool.query(migrationSQL);
    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  }
}

async function runSeed() {
  try {
    console.log('🌱 Running seed...');
    
    const seedSQL = fs.readFileSync(
      path.join(__dirname, 'seed', '001_admin_user.sql'),
      'utf8'
    );
    
    await pool.query(seedSQL);
    console.log('✅ Seed completed successfully');
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    throw error;
  }
}

async function main() {
  try {
    await runMigration();
    await runSeed();
    console.log('🎉 Database setup completed!');
  } catch (error) {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();