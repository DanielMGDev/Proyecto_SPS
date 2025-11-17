"use client"

import { useCart } from "@/contexts/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const BOOKS_DATABASE: Record<string, any> = {
  "1": {
    id: "1",
    title: "El Alquimista",
    author: "Paulo Coelho",
    price: 14.99,
    category: "Ficción",
    image: "/book-cover-adventure.jpg",
    rating: 4.8,
    description: "Una novela cautivadora sobre el viaje de un joven pastor en busca de su destino.",
    fullDescription:
      "El Alquimista cuenta la historia de Santiago, un pastor andaluz que viaja en busca de un tesoro escondido en las pirámides de Egipto. Durante su viaje, conoce personajes extraordinarios que lo ayudan a entender el lenguaje del universo y a seguir sus sueños. Una obra maestra de la literatura contemporánea que ha inspirado a millones de lectores alrededor del mundo.",
    pages: 288,
    isbn: "978-8408101382",
    published: 1988,
    reviews: 4.8,
    reviewCount: 2543,
  },
  "2": {
    id: "2",
    title: "1984",
    author: "George Orwell",
    price: 16.99,
    category: "Distopía",
    image: "/book-cover-dystopian.jpg",
    rating: 4.9,
    description: "Una novela de ciencia ficción que explora un futuro totalitario.",
    fullDescription:
      "1984 es una novela de ciencia ficción que presenta un mundo totalitario donde el gobierno controla cada aspecto de la vida de las personas. La historia sigue a Winston Smith, quien se rebela contra el régimen. Orwell crea un universo inquietante que ha inspirado debates sobre la privacidad, el control estatal y la libertad.",
    pages: 328,
    isbn: "978-0451524935",
    published: 1949,
    reviews: 4.9,
    reviewCount: 3421,
  },
  "3": {
    id: "3",
    title: "El Quijote",
    author: "Miguel de Cervantes",
    price: 12.99,
    category: "Clásico",
    image: "/book-cover-classic.jpg",
    rating: 4.7,
    description: "La obra maestra de la literatura española sobre las aventuras de Don Quijote.",
    fullDescription:
      "El Quijote es la obra maestra de la literatura española y una de las novelas más importantes de todos los tiempos. La historia de Don Quijote de la Mancha y su fiel escudero Sancho Panza ha entretenido y conmovido a lectores durante más de cuatrocientos años.",
    pages: 1072,
    isbn: "978-8408093756",
    published: 1605,
    reviews: 4.7,
    reviewCount: 1834,
  },
}

export default function BookPage() {
  const { id } = useParams()
  const { addItem } = useCart()
  const book = BOOKS_DATABASE[id as string]

  if (!book) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-lg text-muted-foreground">Libro no encontrado</p>
          <Link href="/">
            <Button className="mt-4 bg-primary text-primary-foreground">Volver al Inicio</Button>
          </Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
    })
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              className="max-w-sm h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-sm font-semibold text-accent mb-2">{book.category}</p>
            <h1 className="text-5xl font-serif font-bold text-foreground mb-4">{book.title}</h1>
            <p className="text-2xl text-primary font-semibold mb-2">{book.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(book.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {book.reviews} ({book.reviewCount} reseñas)
              </span>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-8">
              <p className="text-lg text-foreground leading-relaxed">{book.fullDescription}</p>

              {/* Book Info */}
              <Card className="p-4 bg-secondary">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Páginas</p>
                    <p className="font-semibold text-foreground">{book.pages}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Publicado</p>
                    <p className="font-semibold text-foreground">{book.published}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ISBN</p>
                    <p className="font-semibold text-foreground text-sm">{book.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precio</p>
                    <p className="font-bold text-primary text-xl">${book.price}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
