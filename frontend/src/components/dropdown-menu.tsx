'use client'

import { Menu, Heart, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu as DropdownMenuShadcn,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export function DropdownMenu() {
  return (
    <DropdownMenuShadcn>
      <DropdownMenuTrigger asChild className="w-10 h-10">
        <Button variant="outline" size="icon" className="bg-emerald-600 border-emerald-700 hover:bg-emerald-700 hover:text-emerald-100">
          <Menu className="h-[1.5rem] w-[1.5rem] text-zinc-100" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-54 mr-4 bg-zinc-800 border-zinc-700">
        <DropdownMenuItem
          asChild
          className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
        >
          <Link to="/donate">
            <Heart className="mr-2 h-4 w-4 text-pink-500" />
            <span>Contribuir</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          asChild
          className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
        >
          <Link target="_blank" rel="noopener noreferrer"  to="https://github.com/dopeeycode/equivalents-medicines">
            <Github className="mr-2 h-4 w-4" />
            <span>Repositório</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuShadcn>
  )
}