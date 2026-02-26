import React, { useMemo, useState } from "react";

const fieldStyle = {
  backgroundColor: "#0f0f0f",
  borderColor: "#222",
  color: "#ffffff"
};

export default function GeradorBio() {
  const [form, setForm] = useState({
    nome: "",
    nicho: "",
    oferta: "",
    resultado: "",
    prova: "",
    cta: ""
  });

  const bio = useMemo(() => {
    const { nome, nicho, oferta, resultado, prova, cta } = form;
    if (!nome && !nicho && !oferta) return "Preencha o formulário para gerar sua bio.";

    const lines = [
      `${nome || "Seu Nome"} • ${nicho || "Seu Nicho"}`,
      `Aumento ${resultado || "resultados"} com ${oferta || "sua oferta high-ticket"}.`,
      prova ? `Prova: ${prova}` : "Prova: +R$ 1M gerados para clientes seletos.",
      cta ? `⬇ ${cta}` : "⬇ Aplique para a consultoria premium"
    ];

    return lines.join("\n");
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const charCount = bio.length;

  return (
    <section
      className="w-full max-w-4xl mx-auto p-6 rounded-2xl border"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff", borderColor: "#1f1f1f" }}
    >
      <header className="mb-6">
        <h3 className="text-2xl font-semibold">Gerador de Bio High-Ticket</h3>
        <p className="text-sm opacity-80">
          Estruture bios para Instagram com posicionamento de luxo e clareza imediata.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            placeholder="Seu nome"
          />
          <input
            name="nicho"
            value={form.nicho}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            placeholder="Nicho / posicionamento"
          />
          <input
            name="oferta"
            value={form.oferta}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            placeholder="Oferta high-ticket"
          />
          <input
            name="resultado"
            value={form.resultado}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            placeholder="Resultado principal"
          />
          <input
            name="prova"
            value={form.prova}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            placeholder="Prova social"
          />
          <input
            name="cta"
            value={form.cta}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            placeholder="CTA curto"
          />
        </div>

        <div>
          <div className="text-sm font-medium">Bio pronta</div>
          <div
            className="mt-2 rounded-xl border p-4 whitespace-pre-wrap min-h-[240px]"
            style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}
          >
            {bio}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs opacity-80">
            <span>{charCount} caracteres</span>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(bio)}
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: "#ff8020", color: "#0a0a0a" }}
            >
              Copiar bio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
