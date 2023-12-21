import mysql from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';

// // create the connection to database

const config = {
  db: {
    host: process.env.HOST_DOMAIN || 'mysql-152494-0.cloudclusters.net',
    port: process.env.PORT_DATABASE || 10010,
    user: process.env.USER || 'admin',
    password: process.env.PASSWORD || 'R2p4wdLg',
    database: process.env.DATABASE || 'tifo',
    connectionLimit: 10,
    waitForConnections: true
  },
};
console.log(config);
// const config = {
//   db: {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'tifo',
//     connectionLimit: 10,
//     waitForConnections: true
//   },
// };
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
