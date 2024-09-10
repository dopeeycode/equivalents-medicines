
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { FormMedication } from '@/components/form'
import { Globe } from "lucide-react"
import { ResultMedication } from "@/components/result"
import { useState } from "react"
import { Link } from "react-router-dom"
import { DropdownMenu } from "@/components/dropdown-menu"


export function MedicationSearchPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setResult] = useState("")

  // 
  const [isTypingFinished, setIsTypingFinished] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false)
  const [displayText, setDisplayText] = useState('');

  const simulateTyping = (text: string) => {
    const words = text.split(' ');
    let currentIndex = 0;
    setDisplayText('');
    setIsTypingFinished(true)

    const intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayText((prev) => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsTypingFinished(false)
      }
    }, 60);
  };

  function onSetResult(result: string) {
    setResult(result)
    simulateTyping(result)
  }

  function onSetIsLoading(isLoading: boolean) {
    setIsLoading(isLoading)
  }

  return (
    <div className="min-h-screen bg-dots2 bg-no-repeat bg-center bg-zinc-950 flex items-center justify-center p-4">
      <div className="flex lg:flex-row flex-col items-center justify-between gap-8">
        <Card className="w-full border-2 border-zinc-800 lg:max-w-2xl lg:min-h-[407px] bg-zinc-900 text-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Encontre Medicamentos Equivalentes</CardTitle>
            <CardDescription className="text-zinc-400">
              Busque o equivalente do seu medicamento em qualquer lugar do mundo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormMedication isLoading={isLoading} isTyping={isTypingFinished} setIsLoading={onSetIsLoading} setResult={onSetResult} />
          </CardContent>
        </Card>
        <ResultMedication isTyping={isTypingFinished} isLoading={isLoading} result={displayText} />
      </div>
      <div className="fixed hidden bottom-4 left-4 text-zinc-400 lg:flex items-center space-x-2">
        <Globe className="h-5 w-5" />
          <Link 
            className="text-emerald-400 underline underline-offset-4" 
            to="/donate">
              Contribua meu trabalho.
          </Link>
      </div>
      <div className="fixed block animate-pulse lg:hidden right-4 bottom-4">
        <DropdownMenu />
      </div>
      <div className="fixed bottom-4 right-4 text-zinc-400 hidden lg:flex items-center space-x-2">
        <Globe className="h-5 w-5" />
        <span>
            Desenvolvido por {" "}
          <Link 
            className="text-emerald-400 underline underline-offset-4" 
            target="_blank" 
            rel="noopener noreferrer" 
            to="https://github.com/dopeeycode/equivalents-medicines">
              @dopeeycode
          </Link>
        </span>
      </div>
    </div>
  )
}