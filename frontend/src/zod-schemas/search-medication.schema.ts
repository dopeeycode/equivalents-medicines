import z from 'zod'

export const searchMedicationSchema = z.object({
  medication: z.string({
    message: 'Por favor, insira o nome do medicamento!',
  }).nonempty().min(2, "Por favor, insira o nome do medicamento!"),
  country: z.string().optional()
})