import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { BookGrid } from "@/components/book-grid"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const FEATURED_BOOKS = [
  {
    id: "1",
    title: "Matemáticas Avanzadas II",
    author: "Editorial Académica",
    price: 24.99,
    category: "Matemáticas",
    image: "/mathematics-textbook.png",
    rating: 4.8,
    description: "Libro de texto completo para estudiantes de educación media superior.",
  },
  {
    id: "2",
    title: "Literatura Española Contemporánea",
    author: "Instituto Educativo",
    price: 22.99,
    category: "Lengua",
    image: "/literature-textbook.jpg",
    rating: 4.9,
    description: "Colección de obras clásicas y contemporáneas con análisis crítico.",
  },
  {
    id: "3",
    title: "Biología Celular y Genética",
    author: "Centro de Ciencias",
    price: 28.99,
    category: "Ciencias",
    image: "/biology-science-textbook.jpg",
    rating: 4.7,
    description: "Guía completa de biología con ejercicios prácticos y laboratorio.",
  },
  {
    id: "4",
    title: "Historia de América Latina",
    author: "Departamento Histórico",
    price: 26.99,
    category: "Historia",
    image: "/history-textbook-latin-america.jpg",
    rating: 4.6,
    description: "Análisis histórico y sociopolítico de América Latina.",
  },
  {
    id: "5",
    title: "Inglés para Estudiantes",
    author: "Academia de Idiomas",
    price: 21.99,
    category: "Idiomas",
    image: "/english-language-textbook.jpg",
    rating: 4.9,
    description: "Método integral de enseñanza del idioma inglés.",
  },
  {
    id: "6",
    title: "Física: Mecánica y Energía",
    author: "Laboratorio Científico",
    price: 25.99,
    category: "Ciencias",
    image: "/physics-mechanics-textbook.jpg",
    rating: 4.8,
    description: "Teoría y práctica de física clásica para estudiantes.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">Libros Destacados</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Selección de nuestros materiales educativos más solicitados
            </p>
          </div>
          <Link href="/browse">
            <Button variant="outline" className="border-primary text-primary hover:bg-secondary bg-transparent">
              Ver Catálogo Completo
            </Button>
          </Link>
        </div>
        <BookGrid books={FEATURED_BOOKS} />
      </section>
      <Footer />
    </main>
  )
}
