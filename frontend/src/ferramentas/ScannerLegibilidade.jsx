import React, { useMemo, useState } from "react";

const luxuryMap = {
  comum: "exclusivo",
  simples: "refinado",
  barato: "premium",
  bom: "excepcional",
  melhor: "incomparável",
  rápido: "imediato",
  fácil: "fluido",
  fácil: "fluido",
  barato: "premium",
  resultado: "resultado elevado",
  resultados: "resultados elevados",
  alto: "elevado",
  alta: "elevada",
  valor: "valor estratégico",
  cliente: "cliente seleto",
  clientes: "clientes seletos",
  oferta: "proposta exclusiva",
  serviço: "serviço de alto padrão",
  serviços: "serviços de alto padrão",
  produto: "produto de luxo",
  produtos: "produtos de luxo",
  objetivo: "meta refinada",
  garantia: "segurança premium",
  qualidade: "excelência"
};

const wordBoundary = (word) => new RegExp(`\\b${word}\\b`, "gi");

function transformText(text) {
  let result = text;
  Object.entries(luxuryMap).forEach(([key, value]) => {
    result = result.replace(wordBoundary(key), (match) => {
      const isUpper = match === match.toUpperCase();
      if (isUpper) return value.toUpperCase();
      const isCapitalized = match[0] === match[0].toUpperCase();
      if (isCapitalized) return value[0].toUpperCase() + value.slice(1);
      return value;
    });
  });
  return result;
}

export default function ScannerLegibilidade() {
  const [input, setInput] = useState("");

  const output = useMemo(() => transformText(input), [input]);

  return (
    <section
      className="w-full max-w-4xl mx-auto p-6 rounded-2xl border"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff", borderColor: "#1f1f1f" }}
    >
      <header className="mb-6">
        <h3 className="text-2xl font-semibold">Scanner de Legibilidade</h3>
        <p className="text-sm opacity-80">
          Troque palavras comuns por termos de luxo e eleve a percepção instantaneamente.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Texto original</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            className="mt-2 w-full rounded-xl p-3 border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "#0f0f0f",
              borderColor: "#222",
              color: "#ffffff",
              ringColor: "#ff8020"
            }}
            placeholder="Digite seu texto aqui..."
          />
        </div>

        <div>
          <label className="text-sm font-medium">Texto premium</label>
          <div
            className="mt-2 w-full rounded-xl p-3 border min-h-[200px] whitespace-pre-wrap"
            style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}
          >
            {output || "Seu texto premium aparecerá aqui."}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 text-xs opacity-80">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full"
          style={{ backgroundColor: "#ff8020", color: "#0a0a0a" }}
        >
          Self-Service
        </span>
        <span>Experimente diferentes termos para ajustar o tom.</span>
      </div>
    </section>
  );
}
