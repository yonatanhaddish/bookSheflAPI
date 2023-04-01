import express, { response } from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthorService from "./author.service";

export const authorRouter = express.Router();

// getting all authors
authorRouter.get("/", async (request: Request, response: Response) => {
    try {
        const authors = await AuthorService.listAuthors();
        return response.status(200).json(authors);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// getting a single author by a given id
authorRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10);

    try {
        const author = await AuthorService.getAuthor(id);
        if (!author) {
            return response.status(404).json(`Author could not be found with the given id: ${id}`);
        }
        return response.status(200).json(author);
    } catch (error: any) {
        return response.status(404).json("Author could not be found");
    }
});

// POST: Create an Author
// Params: firstName, lastName
authorRouter.post("/", 
    body("firstName").isString(), body("lastName").isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        try {
            const author = request.body;
            const newAuthor = await AuthorService.createAuthor(author);
            return response.status(201).json(newAuthor);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
});

// UPDATE: Update an author by a given id
// Params: firstName, lastName
authorRouter.put("/:id", 
    body("firstName").isString(), body("lastName").isString(),
    async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ arrors: errors.array() })
        }
        const id: number = parseInt(request.params.id, 10);
        try {
            const author = request.body;
            const updatedAuthor = await AuthorService.updateAuthor(author, id);
            return response.status(200).json(updatedAuthor);
        } catch (error: any) {
            return response.status(500).json(error.message);
        }
    }
);

// DELETE: Delete an author by a given id
authorRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id);
    try {
        await AuthorService.deleteAuthor(id);
        return response.status(204).json("Successful: Author Deleted");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});
