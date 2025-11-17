"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookGrid } from "@/components/book-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

const ALL_BOOKS = [
  {
    id: "1",
    title: "El Alquimista",
    author: "Paulo Coelho",
    price: 14.99,
    category: "Ficción",
    image: "/book-cover-adventure.jpg",
    rating: 4.8,
    description: "Una novela cautivadora sobre el viaje de un joven pastor en busca de su destino.",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    price: 16.99,
    category: "Distopía",
    image: "/book-cover-dystopian.jpg",
    rating: 4.9,
    description: "Una novela de ciencia ficción que explora un futuro totalitario.",
  },
  {
    id: "3",
    title: "El Quijote",
    author: "Miguel de Cervantes",
    price: 12.99,
    category: "Clásico",
    image: "/book-cover-classic.jpg",
    rating: 4.7,
    description: "La obra maestra de la literatura española sobre las aventuras de Don Quijote.",
  },
  {
    id: "4",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 18.99,
    category: "No Ficción",
    image: "/book-cover-history.jpg",
    rating: 4.6,
    description: "Una historia breve de la humanidad y su evolución.",
  },
  {
    id: "5",
    title: "El Hobbit",
    author: "J.R.R. Tolkien",
    price: 15.99,
    category: "Fantasía",
    image: "/book-cover-fantasy.jpg",
    rating: 4.9,
    description: "Una aventura épica en la Tierra Media con Bilbo Bolsón.",
  },
  {
    id: "6",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    price: 17.99,
    category: "Realismo Mágico",
    image: "/book-cover-magical.jpg",
    rating: 4.8,
    description: "Una saga familiar que combina la realidad con elementos mágicos.",
  },
]

const CATEGORIES = ["Todos", "Ficción", "Distopía", "Clásico", "No Ficción", "Fantasía", "Realismo Mágico"]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredBooks = useMemo(() => {
    return ALL_BOOKS.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || book.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-foreground">Catálogo de Libros</h1>
        <p className="text-muted-foreground mb-8">Explora nuestra colección completa de libros</p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Input
              placeholder="Buscar por título o autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary text-foreground border-none h-12"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-border hover:bg-secondary bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Mostrando {filteredBooks.length} de {ALL_BOOKS.length} libros
          </p>

          {filteredBooks.length > 0 ? (
            <BookGrid books={filteredBooks} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No se encontraron libros</p>
              <p className="text-sm text-muted-foreground mb-6">Intenta con otros términos de búsqueda o categorías</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Todos")
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
