"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">Portal de Libros Estudiantiles</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Accede a nuestro catálogo completo de libros de texto, guías didácticas y material educativo. Adquisición
          rápida y segura para tu institución.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#featured">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Explorar Catálogo
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-white/20 bg-transparent"
          >
            Ver Programas
          </Button>
        </div>
      </div>
    </section>
  )
}
