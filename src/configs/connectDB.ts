import mysql from 'mysql2/promise';
import { RowDataPacket, createPool } from 'mysql2';

// // create the connection to database

const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tifo',
    connectionLimit: 10,
    waitForConnections: true
  },
};
const pool = mysql.createPool(config.db);
async function queryDb(query: any) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query<RowDataPacket[]>(query);
    return rows;
  } finally {
    connection.release();
  }
}

export default queryDb;
