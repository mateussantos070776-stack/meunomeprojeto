import React, { useMemo, useState } from "react";

const fieldStyle = {
  backgroundColor: "#0f0f0f",
  borderColor: "#222",
  color: "#ffffff"
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number.isFinite(value) ? value : 0
  );

const formatPercent = (value) => `${(Number.isFinite(value) ? value : 0).toFixed(2)}%`;

export default function CalculadoraBreakEven() {
  const [inputs, setInputs] = useState({
    investimento: 5000,
    leads: 200,
    conversao: 0.05,
    ticket: 3000,
    margem: 0.6
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const metrics = useMemo(() => {
    const { investimento, leads, conversao, ticket, margem } = inputs;
    const receitaBruta = leads * conversao * ticket;
    const lucro = receitaBruta * margem - investimento;
    const roi = investimento > 0 ? (lucro / investimento) * 100 : 0;
    const roas = investimento > 0 ? receitaBruta / investimento : 0;
    const breakEvenCpa = ticket * margem * conversao;
    const breakEvenRoas = margem > 0 ? 1 / margem : 0;
    const custoPorLead = leads > 0 ? investimento / leads : 0;
    return {
      receitaBruta,
      lucro,
      roi,
      roas,
      breakEvenCpa,
      breakEvenRoas,
      custoPorLead
    };
  }, [inputs]);

  return (
    <section
      className="w-full max-w-4xl mx-auto p-6 rounded-2xl border"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff", borderColor: "#1f1f1f" }}
    >
      <header className="mb-6">
        <h3 className="text-2xl font-semibold">Calculadora de Break-Even</h3>
        <p className="text-sm opacity-80">
          Projete o ROI e o ponto de equilíbrio para tráfego pago com clareza premium.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm">Investimento em tráfego (R$)</label>
          <input
            type="number"
            name="investimento"
            value={inputs.investimento}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
          />

          <label className="text-sm">Leads gerados</label>
          <input
            type="number"
            name="leads"
            value={inputs.leads}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
          />

          <label className="text-sm">Taxa de conversão (0-1)</label>
          <input
            type="number"
            step="0.01"
            name="conversao"
            value={inputs.conversao}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
          />

          <label className="text-sm">Ticket médio (R$)</label>
          <input
            type="number"
            name="ticket"
            value={inputs.ticket}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
          />

          <label className="text-sm">Margem líquida (0-1)</label>
          <input
            type="number"
            step="0.01"
            name="margem"
            value={inputs.margem}
            onChange={handleChange}
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
          />
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
            <div className="text-sm opacity-80">Receita bruta</div>
            <div className="text-2xl font-semibold">{formatCurrency(metrics.receitaBruta)}</div>
          </div>
          <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
            <div className="text-sm opacity-80">Lucro estimado</div>
            <div className="text-2xl font-semibold">{formatCurrency(metrics.lucro)}</div>
          </div>
          <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
            <div className="text-sm opacity-80">ROI</div>
            <div className="text-2xl font-semibold">{formatPercent(metrics.roi)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
              <div className="text-xs opacity-80">CPL atual</div>
              <div className="text-lg font-semibold">{formatCurrency(metrics.custoPorLead)}</div>
            </div>
            <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
              <div className="text-xs opacity-80">Break-even CPA</div>
              <div className="text-lg font-semibold">{formatCurrency(metrics.breakEvenCpa)}</div>
            </div>
            <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
              <div className="text-xs opacity-80">ROAS atual</div>
              <div className="text-lg font-semibold">{metrics.roas.toFixed(2)}</div>
            </div>
            <div className="rounded-xl border p-4" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
              <div className="text-xs opacity-80">ROAS break-even</div>
              <div className="text-lg font-semibold">{metrics.breakEvenRoas.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
