import { db } from '../utils/db.server';

export type Author = {
    id: number;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date
};

export const listAuthors = async (): Promise<Author[]> => {
    return db.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

export const getAuthor = async (id: number): Promise<Author | null> => {
    return db.author.findUnique({
        where: {
            id: id
        }
    });
};

export const createAuthor = async (author: Omit<Author, "id">): Promise<Author> => {
    const  {firstName, lastName } = author;
    return db.author.create({
        data: {
            firstName: firstName,
            lastName: lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

export const updateAuthor = async (author: Omit<Author, "id">, id: number): Promise<Author> => {
    const { firstName, lastName } = author;
    return db.author.update({
        where: {
            id: id
        },
        data: {
            firstName: firstName,
            lastName: lastName
        }
    });
};