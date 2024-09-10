import z from "zod";
import 'dotenv/config'

const envSchema = z.object({
  COHERE_API_KEY: z.string(),
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'production']).default("development"),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("Erro de validação das variáveis de ambiente:", _env.error.format());
  throw new Error()
} 

export const env = _env.data