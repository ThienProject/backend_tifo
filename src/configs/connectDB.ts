import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

// // create the connection to database

// const config = {
//   db: {
//     host: 'mysql-130176-0.cloudclusters.net',
//     port: 18071,
//     user: 'admin',
//     password: 'm7UypRVa',
//     database: 'tifo',
//     connectionLimit: 10,
//     waitForConnections: true
//   },
// };
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
