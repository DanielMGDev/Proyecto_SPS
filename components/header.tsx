"use client"

import type React from "react"

import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Search, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const { itemCount } = useCart()
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/browse?search=${encodeURIComponent(query)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchInput)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="text-primary-foreground font-bold text-lg" size={24} />
            </div>
            <span className="hidden sm:inline font-serif text-xl font-bold text-foreground">Portal Educativo</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Input
                placeholder="Buscar libros de texto..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-secondary text-foreground border-none"
              />
              <button
                onClick={() => handleSearch(searchInput)}
                className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link href="/browse">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Catálogo
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative bg-transparent">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              placeholder="Buscar libros de texto..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-secondary text-foreground border-none"
            />
            <button
              onClick={() => handleSearch(searchInput)}
              className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
