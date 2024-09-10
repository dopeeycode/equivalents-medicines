export const generatePrompt = (medication: string, country?: string): string => {
  return `Você é um assistente especializado em farmacologia internacional. Um usuário brasileiro está procurando equivalentes internacionais para um medicamento brasileiro. 

Medicamento brasileiro: ${medication}

Por favor, forneça as seguintes informações:

1. Liste 3 medicamentos equivalentes disponíveis internacionalmente, preferencialmente no ${country ? country : 'Estados Unidos'}.
2. Para cada medicamento equivalente, inclua:
   a) Nome comercial
   b) Princípio ativo
   c) Uso comum
   d) Qualquer diferença notável em relação ao medicamento brasileiro

Formato da resposta:
1. [Nome Comercial]
   - Princípio ativo: [princípio ativo]
   - Uso comum: [breve descrição]
   - Diferenças: [se houver, ou "Similar ao brasileiro"]

2. [repita o formato para o segundo medicamento]

3. [repita o formato para o terceiro medicamento]

Nota: Se não houver equivalentes exatos, sugira alternativas próximas e explique as diferenças.

Importante: Adicione um lembrete no final da resposta de que esta informação é apenas para referência e que o usuário deve consultar um profissional de saúde antes de usar qualquer medicação.`;
};