import { Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FormattedMarkdown } from './fragments/markdown-result'


interface ResultMedicationProps {
  result: string;
  isLoading: boolean;
  isTyping: boolean
}

export function ResultMedication({ result, isLoading, isTyping }: ResultMedicationProps) {
  function getKnowledgeDayOrNight() {
    const hour = new Date().getHours();

    if (hour >= 18 || hour < 5) {
      return "Feliz noite, Amigo!";
    } else if (hour >= 5 && hour < 12) {
      return "Feliz dia, Amigo!";
    } else {
      return "Feliz tarde, Amigo!";
    }
  }

  return (
    <Card className="w-full border-2 border-zinc-800 lg:min-w-[42rem] scrollbar-thin max-w-2xl lg:min-h-[407px] lg:max-h-[407px] bg-zinc-900 overflow-y-auto text-white shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Resultado</CardTitle>
        <CardDescription className="text-zinc-400">
          Veja os resultados encontrados a seguir.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="min-h-[230px]">
            <div className="flex items-start gap-4">
            <Avatar className="size-8">
              <AvatarImage src="/logo.svg" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
    
            {isLoading ? (
              <p className="text-sm text-zinc-400 leading-relaxed tracking-wide animate-pulse">
                Buscando pra você 😊...
              </p>
            ) : (
              <p className="text-sm text-zinc-400 leading-relaxed tracking-wide">
                {result ? (
                  <>
                    <FormattedMarkdown result={result}  />
                  </>
                ) : (
                  !isTyping && getKnowledgeDayOrNight()
                )}
              </p>
            )}
          </div>

        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center space-x-2  text-zinc-400">
          <Info className="h-4 w-4 hidden sm:block" />
          <p className="text-sm">Consultar um profissional de saúde antes de usar qualquer medicação.</p>
        </div>
      </CardFooter>
    </Card>
  );
}
