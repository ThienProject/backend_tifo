import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import cors from 'cors'
import morgan from 'morgan';
import { errorConverter, errorHandler } from './middleware/error';
dotenv.config();
const port = process.env.PORT;

const app: Express = express();
morgan('dev') // log info request
app.use(express.json()); // convert json to javascript type;
app.use(express.urlencoded({ extended: true })); //convert application/x-www-form-urlencoded (form data)
// config path media
app.use('/', express.static('public'));


app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);


// v1 api routes
app.use('/api/v1', routes);
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});