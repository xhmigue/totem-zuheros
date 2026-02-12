import React from "react";

/* El código: Componente TextRenderer
Este componente busca:

**texto** → Negrita

__texto__ → Cursiva/Manuscrita

--texto-- → <u>Subrayado</u>

[texto](url) → Link azul */
const TextRenderer = ({ text }: { text: string }) => {
  // Esta regex busca patrones de negrita, cursiva, subrayado y links
  const tokens = text.split(/(\*\*.*?\*\*|__.*?__|--.*?--|\[.*?\]\(.*?\))/g);

  return (
    <span>
      {tokens.map((token, i) => {
        // Negrita: **texto**
        if (token.startsWith("**") && token.endsWith("**")) {
          return (
            <strong key={i} className="font-bold">
              {token.slice(2, -2)}
            </strong>
          );
        }
        // Cursiva/Manuscrita: __texto__
        if (token.startsWith("__") && token.endsWith("__")) {
          return (
            <em key={i} className="italic italic-font">
              {token.slice(2, -2)}
            </em>
          );
        }
        // Subrayado: --texto--
        if (token.startsWith("--") && token.endsWith("--")) {
          return (
            <u key={i} className="underline">
              {token.slice(2, -2)}
            </u>
          );
        }
        // Link: [texto](url)
        if (token.startsWith("[") && token.includes("](")) {
          const match = token.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return (
              <span
                key={i}
                className="text-blue-600 underline hover:text-blue-800"
                rel="noopener noreferrer"
              >
                {match[1]}
              </span>
            );
          }
        }
        // Texto normal
        return token;
      })}
    </span>
  );
};

export default TextRenderer;
