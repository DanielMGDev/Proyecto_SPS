"use client"

import type React from "react"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"

interface BookCardProps {
  book: {
    id: string
    title: string
    author: string
    price: number
    image: string
    rating: number
    description: string
    category?: string
  }
}

export function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
    })
  }

  return (
    <Link href={`/book/${book.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-64 bg-muted overflow-hidden">
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              {book.rating}
            </div>
          </div>
        </CardContent>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-serif font-bold text-foreground line-clamp-2">{book.title}</h3>
          <CardDescription className="text-primary font-medium">{book.author}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-3 pb-4">
          <p className="text-foreground text-sm line-clamp-2">{book.description}</p>
          <div className="flex items-center justify-between w-full pt-2">
            <span className="text-2xl font-bold text-primary">${book.price}</span>
            <Button size="sm" onClick={handleAddToCart} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
