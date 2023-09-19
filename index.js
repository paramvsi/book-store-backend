import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import router from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use('/books', router);

app.get('/', (request, response) => {
  return response.status(234).send('Welcome to bookstore app');
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App is connected to the database');

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
