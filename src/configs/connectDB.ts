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

async function queryDb(query: any) {
  const connection = await mysql.createConnection(config.db);
  console.log(query)
  const [results] = await connection.execute<RowDataPacket[]>(query);
  return results;
}

export default queryDb;
