import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

// // create the connection to database

const config = {
  db: {
    host: 'mysql-127954-0.cloudclusters.net',
    user: 'admin',
    password: 'hxlsPdSL',
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
export async function executeDb(query: any, values: any[]) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute<RowDataPacket[]>(query, values);
    console.log({ result })
    return result;
  } finally {
    connection.release();
  }
}
export default queryDb;
