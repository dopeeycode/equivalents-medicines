import express from 'express'
import cors from 'cors'

import { CohereClient } from 'cohere-ai'

import { generatePrompt } from './utils'

import { env } from './env'
import z, { ZodError } from 'zod'

const client = new CohereClient({ token: env.COHERE_API_KEY });        

const app = express()
const port = env.PORT || 3000

app.use(express.json())
app.use(cors())
app.listen(port, () => {
  console.log('started')
})


const baseURL = env.NODE_ENV === 'production' ? 'https://equivalents-medicines.onrender.com' : 'http://localhost:3000'

app.post(`${baseURL}/api/search`, async (req, res) => {
  try {
    const searchMedicationSchemaBody = z.object({
      medication: z.string({
        message: 'O campo de medicamento é obrigatório!'
      }),
      country: z.string().optional()
    })

    const { medication, country } = searchMedicationSchemaBody.parse(req.body)

    const response = await client.chat(
      {
        message: medication,
        model: "command-r-plus",
        preamble: generatePrompt(medication, country),
      }
    )

    return res.json({ result: response.text })
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map((err) => ({
        message: err.message,
      }));
  
      res.status(400).json({
        result: 'Erro ao processar a solicitação',
        errors: validationErrors,
      });
    }else {
      res.status(500).json({
        result: 'Erro ao processar a solicitação',
        message: error || 'Erro desconhecido.',
      }); 
    }
  }
})

export default app