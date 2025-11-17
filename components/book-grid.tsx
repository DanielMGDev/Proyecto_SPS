"use client"

import { BookCard } from "./book-card"

interface Book {
  id: string
  title: string
  author: string
  price: number
  category: string
  image: string
  rating: number
  description: string
}

interface BookGridProps {
  books: Book[]
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
