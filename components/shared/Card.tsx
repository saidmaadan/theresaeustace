import { IBook } from '@/lib/database/models/book.model'
import { formatDateTime } from '@/lib/utils'
import { getAuth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'

type CardProps = {
  book: IBook,
  
}

const Card = ({ book }: CardProps) => {
  const { sessionClaims } = getAuth(req);
  const userId = sessionClaims?.userId as string;

  const isBookCreator = userId === book.author._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link 
        href={`/books/${book._id}`}
        style={{backgroundImage: `url(${book.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS book CREATOR ... */}

      {isBookCreator && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/books/${book._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
          </Link>

          <DeleteConfirmation bookId={book._id} />
        </div>
      )}

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
        <p className="p-medium-14 md:p-medium-16 text-grey-600">
          {formatDateTime(book.createdAt)}</p>

        <Link href={`/books/${book._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{book.title}</p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {book.author.firstName} {book.author.lastName}
          </p>

          
        </div>
      </div>
    </div>
  )
}

export default Card