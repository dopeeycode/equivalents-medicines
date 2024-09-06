import express from 'express'
import cors from 'cors'

import { CohereClient } from 'cohere-ai'

import { generatePrompt } from './utils'

import { env } from './env'
import z, { ZodError } from 'zod'

const client = new CohereClient({ token: env.COHERE_API_KEY });        

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.listen(port, () => {
  console.log('Server running')
});


app.post('/api/equivalente', async (req, res) => {
  try {
    const equivalenteSchemaBody = z.object({
      medicamento: z.string({
        message: 'O campo de medicamento é obrigatório!'
      }),
      pais: z.string().optional()
    })

    const { medicamento, pais } = equivalenteSchemaBody.parse(req.body)

    if (!medicamento) {
      return res.status(400).json({ error: 'O nome do medicamento é obrigatório!' })
    }

    const response = await client.chat(
      {
        message: medicamento,
        model: "command-r-plus",
        preamble: generatePrompt(medicamento, pais),
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
