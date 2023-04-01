import { db } from '../utils/db.server';

import { Author } from '../author/author.service';

type BookRead = {
    id: number;
    title: string;
    isFiction: boolean;
    datePublished: Date;
    author: Author
    // authorId: number;
};
type BookWrite = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
    authorId: number;
}

export const listBooks = async (): Promise<BookRead[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
            // authorId: true
        }
    });
};

export const getBook = async (id: number): Promise<BookRead | null> => {
    return db.book.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true,
                    updatedAt: true
                },
            }
        }
    });
};

export const createBook = async (book: BookWrite): Promise<BookRead> => {
    const { title, isFiction, datePublished, authorId } = book;
    const parsedDate: Date = new Date(datePublished);
    return db.book.create({
        data: {
            title: title,
            isFiction: isFiction,
            authorId: authorId,
            datePublished: parsedDate
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    updatedAt: true,
                    createdAt: true
                }
            }
        }
    });
};

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
    const { title, isFiction, datePublished, authorId } = book;
    // const parsedDate: Date = new Date(datePublished);
    return db.book.update({
        where: {
            id: id
        },
        data: {
            title,
            isFiction,
            datePublished,
            authorId
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    updatedAt: true,
                    createdAt: true
                }
            }
        }
    })
};

export const deleteBook = async (id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id: id
        }
    });
};