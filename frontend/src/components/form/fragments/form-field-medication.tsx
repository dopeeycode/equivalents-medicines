import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { searchMedicationSchema } from "@/zod-schemas/search-medication.schema";
import { Search } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface FormFieldMedicationProps {
  form: UseFormReturn<z.infer<typeof searchMedicationSchema>>
}

export function FormFieldMedication({ form }: FormFieldMedicationProps) {
  return (
    <FormField
      control={form.control}
      name="medication" 
      render={({ field }) => (
        <FormItem>
          <div className="space-y-2">
            <FormLabel className="texr-emerald-500" htmlFor="medication">Nome do Medicamento</FormLabel>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder="Ex: Dipirona, Paracetamol"
                    required
                    className="pl-8 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-700"
                  />
                </FormControl>
              </div>
          </div>
        </FormItem>
      )}
    />
  )
}