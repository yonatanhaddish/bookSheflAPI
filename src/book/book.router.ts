import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as BookService from "./book.service";

export const bookRouter = express.Router();

// getting all books
bookRouter.get("/", async (request: Request, response: Response) => {
    try {
        const books = await BookService.listBooks();
        return response.status(200).json(books);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// getting a single book by a given id
bookRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);
    try {
        const book = await BookService.getBook(id);
        return response.status(200).json(book);
    } catch (error: any) {
        return response.status(404).json(error.message);
    }
});

// create a book
bookRouter.post("/",
    body("title").isString(), 
    body("isFiction").isBoolean(), 
    body("authorId").isInt(),
    body("datePublished").isDate().toDate(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()});
        }
        try {
            const book = request.body;
            const newBook = await BookService.createBook(book);
            return response.status(201).json(newBook);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);