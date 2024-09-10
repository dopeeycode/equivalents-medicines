import ReactMarkdown from 'react-markdown';

// Função para renderizar o Markdown com estilos personalizados usando Tailwind CSS
export const FormattedMarkdown = ({ result }: { result: string }) => {
  return (
    <div>
      <ReactMarkdown
        components={{
          // Estiliza títulos (negrito com cor)
          strong: ({ children }) => (
            <strong className="text-zinc-50 font-bold">{children}</strong>
          ),
          // Estiliza listas (espaçamento e cor)
          ul: ({ children }) => <ul className="list-disc ml-6 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-6 mb-2">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          // Estiliza parágrafos (espacamento entre linhas)
          p: ({ children }) => <p className="mb-2 text-zinc-300">{children}</p>,
        }}
      >
        {result}
      </ReactMarkdown>
    </div>
  );
};