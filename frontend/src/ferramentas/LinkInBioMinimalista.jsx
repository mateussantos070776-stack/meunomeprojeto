import React, { useMemo, useState } from "react";

const fieldStyle = {
  backgroundColor: "#0f0f0f",
  borderColor: "#222",
  color: "#ffffff"
};

export default function LinkInBioMinimalista() {
  const [profile, setProfile] = useState({
    nome: "Seu Nome",
    headline: "Consultor Premium",
    bio: "Estratégia de crescimento com estética de luxo.",
    links: [
      { label: "Aplicar para consultoria", url: "https://seusite.com" },
      { label: "Conteúdos exclusivos", url: "https://seusite.com/insights" }
    ]
  });

  const updateLink = (index, field, value) => {
    setProfile((prev) => {
      const links = prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      );
      return { ...prev, links };
    });
  };

  const addLink = () => {
    setProfile((prev) => ({
      ...prev,
      links: [...prev.links, { label: "Novo link", url: "https://" }]
    }));
  };

  const previewLinks = useMemo(() => profile.links.filter((l) => l.label && l.url), [profile]);

  return (
    <section
      className="w-full max-w-5xl mx-auto p-6 rounded-2xl border"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff", borderColor: "#1f1f1f" }}
    >
      <header className="mb-6">
        <h3 className="text-2xl font-semibold">Link-in-Bio Minimalista</h3>
        <p className="text-sm opacity-80">
          Crie uma página de links com estética sofisticada e foco absoluto no luxo.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <input
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            value={profile.nome}
            onChange={(e) => setProfile((prev) => ({ ...prev, nome: e.target.value }))}
            placeholder="Nome"
          />
          <input
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            value={profile.headline}
            onChange={(e) => setProfile((prev) => ({ ...prev, headline: e.target.value }))}
            placeholder="Headline"
          />
          <textarea
            className="w-full rounded-xl p-3 border"
            style={fieldStyle}
            rows={3}
            value={profile.bio}
            onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
            placeholder="Bio curta"
          />

          <div className="space-y-3">
            {profile.links.map((link, index) => (
              <div key={index} className="grid gap-2 md:grid-cols-[1fr_1fr]">
                <input
                  className="rounded-xl p-3 border"
                  style={fieldStyle}
                  value={link.label}
                  onChange={(e) => updateLink(index, "label", e.target.value)}
                  placeholder="Título do link"
                />
                <input
                  className="rounded-xl p-3 border"
                  style={fieldStyle}
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  placeholder="URL"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addLink}
            className="px-4 py-2 rounded-full"
            style={{ backgroundColor: "#ff8020", color: "#0a0a0a" }}
          >
            Adicionar link
          </button>
        </div>

        <div className="rounded-2xl border p-6" style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}>
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto rounded-full mb-4"
              style={{ backgroundColor: "#ff8020" }}
            />
            <h4 className="text-xl font-semibold">{profile.nome}</h4>
            <p className="text-sm opacity-80">{profile.headline}</p>
            <p className="text-xs opacity-60 mt-2">{profile.bio}</p>
          </div>

          <div className="mt-6 space-y-3">
            {previewLinks.map((link, index) => (
              <div
                key={`${link.label}-${index}`}
                className="w-full text-center px-4 py-3 rounded-xl border"
                style={{ borderColor: "#2a2a2a", backgroundColor: "#0a0a0a" }}
              >
                <span className="text-sm" style={{ color: "#ff8020" }}>
                  {link.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
