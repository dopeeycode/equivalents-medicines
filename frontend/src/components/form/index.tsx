import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { searchMedicationSchema } from "@/zod-schemas/search-medication.schema";
import { FormFieldMedication } from "./fragments/form-field-medication";
import { z } from "zod";
import { FormFieldCountry } from "./fragments/form-field-coutry";
import { Form } from "../ui/form";
import { useState } from "react";

type SearchMedicationProps = z.infer<typeof searchMedicationSchema>

interface FormMedicationProps {
  setResult: (result: string) => void
  setIsLoading: (isLoading: boolean) => void
  isTyping: boolean
  isLoading: boolean
}

export function FormMedication({ setResult, setIsLoading, isTyping, isLoading }: FormMedicationProps) {
  const form = useForm<SearchMedicationProps>({
    resolver: zodResolver(searchMedicationSchema),
  })


  const [country, setCountry] = useState("")
  const { formState: { errors } } = form

  
  async function handle(data: SearchMedicationProps) {
    try {
    setIsLoading(true)
    setCountry("")
    
    if (country) {
      form.setValue("country", country)
    }
    form.reset()


    await fetch('http://localhost:3000/api/equivalente', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        medication: data.medication,
        country: country ? country : data.country
      })
    }).then(async (value) => {
      const textResponse = await value.text()

      const resultFetch = JSON.parse(textResponse)

      setResult(resultFetch.result)
      setIsLoading(false)
    })
   } catch (error) {
    console.error(error)
    setIsLoading(false)
   }
  }


  return (
    <form onSubmit={form.handleSubmit(handle)} className="space-y-4">
      <Form {...form}>
        <FormFieldMedication form={form} />

        {errors.medication && (
          <span className="text-sm text-red-400">{errors.medication.message}</span> 
        )}
        <FormFieldCountry setCountry={setCountry} form={form} />

        <Button 
          type="submit" 
          disabled={isLoading || isTyping} 
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
        >
          {isLoading || isTyping ? (
            <>
              Buscando...
            </>
          ): (
            <>
              Buscar Equivalentes
            </>
          )}
        </Button>
      </Form>
    </form>
  )
}