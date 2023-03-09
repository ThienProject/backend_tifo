import mysql from 'mysql2/promise';
import { RowDataPacket, createPool } from 'mysql2';

// // create the connection to database

const config = {
  db: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tifo',
  },
  listPerPage: 10,
};
const connection = mysql.createConnection(config.db);
async function queryDb(query: any) {
  if (connection) {
    const [results] = await (await connection).execute<RowDataPacket[]>(query);
    return results;

  }
}

export default queryDb;
