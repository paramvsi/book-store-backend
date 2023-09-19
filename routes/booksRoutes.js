import express from 'express';
import { Book } from '../models/bookStore.js';

const router = express.Router();

router.get('/', async (request, response) => {
  const books = await Book.find();

  return response.status(200).send({ count: books.length, data: books });
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const book = await Book.findById(id);
  return response.status(200).send(book);
});

router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send('Invalid Request. Send All Required Fields');
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book Not Found' });
    }

    return response.status(200).json({ message: 'Book Updated Successfully' });
  } catch (error) {
    console.log('Error at Books Updation', error.message);
    return response.status(500).send('An Error Occurred', error.message);
  }
});

router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send('Invalid Request. Send All Required Fields');
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(200).send(book);
  } catch (error) {
    console.log('Error at Books creation', error.message);
    response.status(500).send('An Error Occurred', error.message);
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Book Not Found' });
    }
    return response.status(200).json({ message: 'Book Deleted Successfully' });
  } catch (error) {
    console.log('Error at Books Deletion', error.message);
    response.status(500).send('An Error Occurred', error.message);
  }
});

export default router;
