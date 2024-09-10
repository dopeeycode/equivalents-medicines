import * as React from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { Earth } from "lucide-react"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchMedicationSchema } from "@/zod-schemas/search-medication.schema"

interface FormFieldCountryProps {
  form: UseFormReturn<z.infer<typeof searchMedicationSchema>>
  setCountry: (country: string) => void
}

const predefinedCountries = [
  { value: "estados unidos", label: "Estados Unidos" },
  { value: "holanda", label: "Holanda" },
  { value: "canada", label: "Canadá" },
  { value: "alemanha", label: "Alemanha" },
  { value: "portugal", label: "Portugal" },
]

export function FormFieldCountry({ form, setCountry }: FormFieldCountryProps) {
  const [customCountry, setCustomCountry] = React.useState("")
  const [isCustom, setIsCustom] = React.useState(false)

  const handleCountryChange = (value: string) => {
    if (value === "custom") {
      setIsCustom(true)
      form.setValue("country", customCountry)
    } else {
      setIsCustom(false)
      form.setValue("country", value)
    }
    setCountry(value === "custom" ? customCountry : value)
  }

  const handleCustomCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomCountry(value)
    form.setValue("country", value)
    setCountry(value)
  }

  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="country">País (Opcional)</FormLabel>
          <Select onValueChange={handleCountryChange} value={isCustom ? "custom" : field.value}>
            <FormControl>
              <SelectTrigger id="country" className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Selecione um país" />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              {predefinedCountries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
              <SelectItem value="custom">Outro</SelectItem>
            </SelectContent>
          </Select>
          {isCustom && (
            <div className="relative">
              <Earth className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                value={customCountry}
                onChange={handleCustomCountryChange}
                placeholder="Digite um outro país"
                className="pl-8 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500"
                aria-label="Digite um outro país"
              />
            </div>
          )}
          <FormDescription>
            Este campo é opcional. Caso não seja definido, por padrão buscaremos pela região dos Estados Unidos.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}