"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📚</span>
              <span className="font-serif text-xl font-bold">LibreBooks</span>
            </div>
            <p className="text-primary-foreground/80">Tu librería en línea de confianza con miles de títulos.</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif font-bold mb-4">Navegación</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="/" className="hover:text-primary-foreground transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary-foreground transition">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Categorías
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold mb-4">Contacto</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Clase_PSP@poligran.edu.co</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+57 3115696541</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Colombia, Politecnico</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 LibreBooks. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
