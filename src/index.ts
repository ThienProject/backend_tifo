import express, { Express, Request, Response, NextFunction } from 'express';
const fs = require('fs');
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors'
import morgan from 'morgan';
import { errorConverter, errorHandler } from './middleware/error';
import multer from 'multer';
const https = require('https');
import userService from './services/user.services';
dotenv.config();
const port = process.env.PORT;
const app: Express = express();
morgan('dev') // log info request
app.use(express.json()); // convert json to javascript type;
app.use(express.urlencoded({ extended: true })); //convert application/x-www-form-urlencoded (form data)
// config path media
app.use('/', express.static('src/public'));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading the files
    console.log('Multer error:', err);
    res.status(500).send('Multer error');
  } else {
    // An unknown error occurred
    console.log('Unknown error:', err);
    res.status(500).send('Unknown error');
  }
});
app.use(
  cors({
    // origin: 'http://localhost:3000', // Hoặc cấu hình nguồn gốc của bạn (ví dụ: 'http://localhost:3000')
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  })
);

// v1 api routes
app.use('/api/v1', routes);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(errorConverter);
app.use(errorHandler);

const server = require('http').createServer(app);



export const io = require('socket.io')(server, {
  cors: {
    // origin: '*', // Hoặc cấu hình nguồn gốc của bạn (ví dụ: 'http://localhost:3000')
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
  }
});


export const userSockets: any = {};
io.on("connection", async (socket: any) => {
  socket.id_user = socket.handshake.query.id_user;
  console.log(`⚡: ${socket.id_user} user just connected!`);
  userSockets[socket.id_user] = socket;
  if (socket.id_user && socket.id_user != 'undefined') {
    await userService.setOnline(socket.id_user);
  }
  socket.on("disconnect", async () => {
    console.log("🔥: A user disconnected " + socket.id_user);
    if (socket.id_user && socket.id_user != 'undefined') {
      await userService.setOffline(socket.id_user);
    }
    delete userSockets[socket.id_user];
  });
});


server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});