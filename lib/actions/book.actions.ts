'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Book from '@/lib/database/models/book.model'
import User from '@/lib/database/models/user.model'

import { handleError } from '@/lib/utils'

import {
  CreateBookParams,
  UpdateBookParams,
  DeleteBookParams,
  GetAllBooksParams,
  
} from '@/types'



const populateBook = (query: any) => {
  return query
    .populate({ path: 'author', model: User, select: '_id firstName lastName' })
    
}

// CREATE
export async function createBook({ userId, book, path }: CreateBookParams) {
  try {
    await connectToDatabase()

    const author = await User.findById(userId)
    if (!author) throw new Error('author not found')

    const newBook = await Book.create({ ...book, author: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newBook))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getBookById(bookId: string) {
  try {
    await connectToDatabase()

    const book = await populateBook(Book.findById(bookId))

    if (!book) throw new Error('Book not found')

    return JSON.parse(JSON.stringify(book))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateBook({ userId, book, path }: UpdateBookParams) {
  try {
    await connectToDatabase()

    const bookToUpdate = await Book.findById(book._id)
    if (!bookToUpdate || bookToUpdate.author.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedBook = await Book.findByIdAndUpdate(
      book._id,
      { ...book },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedBook))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteBook({ bookId, path }: DeleteBookParams) {
  try {
    await connectToDatabase()

    const deletedBook = await Book.findByIdAndDelete(BeforeUnloadEventookId)
    if (deletedBook) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllBooks({ query, limit = 6, page }: GetAllBooksParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    
    const skipAmount = (Number(page) - 1) * limit
    const booksQuery = Book.find(titleCondition)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const books = await populateBook(booksQuery)
    const booksCount = await Book.countDocuments(titleCondition)

    return {
      data: JSON.parse(JSON.stringify(books)),
      totalPages: Math.ceil(booksCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// // GET EVENTS BY author
// export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
//   try {
//     await connectToDatabase()

//     const conditions = { author: userId }
//     const skipAmount = (page - 1) * limit

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)

//     const events = await populateEvent(eventsQuery)
//     const eventsCount = await Event.countDocuments(conditions)

//     return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
//   } catch (error) {
//     handleError(error)
//   }
// }

// // GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
// export async function getRelatedEventsByCategory({
//   categoryId,
//   eventId,
//   limit = 3,
//   page = 1,
// }: GetRelatedEventsByCategoryParams) {
//   try {
//     await connectToDatabase()

//     const skipAmount = (Number(page) - 1) * limit
//     const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)

//     const events = await populateEvent(eventsQuery)
//     const eventsCount = await Event.countDocuments(conditions)

//     return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
//   } catch (error) {
//     handleError(error)
//   }
// }
