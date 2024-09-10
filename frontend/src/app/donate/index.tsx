'use client'

import { useState } from 'react'
import { Copy, Check, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
import { DropdownMenu } from '@/components/dropdown-menu'

export function DonatePage() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const chavePix = "f0129288-5d32-4f6c-8e48-424f6096a90e"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(chavePix)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      description: (
        <div className='space-y-2'>
          <div className="flex items-center gap-1">
            <Check size={18} className="text-emerald-400" />
            <strong>Concluido !</strong>
          </div>

          <p className="text-sm text-zinc-200">Chave pix copiada para sua area de tranferência.</p>
        </div>
      ),
      variant: "default",
      className: "bg-zinc-900 text-zinc-100",
      
    })
  }

  return (
    <div className="flex items-center bg-dots2 bg-no-repeat bg-center justify-center min-h-screen bg-zinc-950">
      <Card className="w-full max-w-md rounded-none sm:rounded-lg bg-zinc-900 border-2 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-zinc-50">Faça uma Doação</CardTitle>
          <CardDescription className="text-center text-zinc-400">Sua contribuição é muito importante para nós!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="qrcode-pix.png" className="size-60" alt="" />
          </div>
          <p className="text-sm text-center text-zinc-400">
            Escaneie o QR Code acima com o app do seu banco ou use a chave PIX abaixo:
          </p>
          <div className="flex items-center space-x-2">
            <code className="bg-zinc-100 px-2 py-1 rounded text-sm">{chavePix}</code>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-zinc-400 w-full">
            Obrigado por sua generosidade!
          </p>
        </CardFooter>
      </Card>

      <div className="relative">
        <div className="fixed block animate-pulse lg:hidden right-4 max-md:top-4 md:bottom-4">
          <DropdownMenu />
        </div>
        <div
          onClick={() => window.location.href = '/search'}
         className="fixed block animate-pulse md:hidden left-4 top-4"
        >
          <div className="flex items-center p-1 bg-zinc-800 rounded-full text-zinc-200 ">
            <ChevronLeft className="size-8 " />
          </div>
        </div>
      </div>
    </div>
  )
}