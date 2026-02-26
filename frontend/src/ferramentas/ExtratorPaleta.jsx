import React, { useRef, useState } from "react";

const fieldStyle = {
  backgroundColor: "#0f0f0f",
  borderColor: "#222",
  color: "#ffffff"
};

const rgbToHex = (r, g, b) =>
  `#${[r, g, b]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;

const quantize = (value, steps = 16) => Math.round(value / (255 / steps)) * (255 / steps);

export default function ExtratorPaleta() {
  const [palette, setPalette] = useState(["#1F1F1F", "#FF8020", "#FFFFFF"]);
  const [imageSrc, setImageSrc] = useState("");
  const canvasRef = useRef(null);

  const extractPalette = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(img, 0, 0, size, size);

    const { data } = ctx.getImageData(0, 0, size, size);
    const bucket = new Map();

    for (let i = 0; i < data.length; i += 16) {
      const r = quantize(data[i]);
      const g = quantize(data[i + 1]);
      const b = quantize(data[i + 2]);
      const key = `${r},${g},${b}`;
      bucket.set(key, (bucket.get(key) || 0) + 1);
    }

    const top = [...bucket.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => {
        const [r, g, b] = key.split(",").map(Number);
        return rgbToHex(r, g, b);
      });

    if (top.length) setPalette(top);
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setImageSrc(reader.result);
        extractPalette(img);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <section
      className="w-full max-w-4xl mx-auto p-6 rounded-2xl border"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff", borderColor: "#1f1f1f" }}
    >
      <header className="mb-6">
        <h3 className="text-2xl font-semibold">Extrator de Paleta</h3>
        <p className="text-sm opacity-80">
          Faça upload de uma imagem e extraia 3 cores principais via Canvas API.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <input type="file" accept="image/*" onChange={handleFile} className="w-full rounded-xl p-3 border" style={fieldStyle} />
          {imageSrc ? (
            <img src={imageSrc} alt="Prévia" className="rounded-xl border" style={{ borderColor: "#222" }} />
          ) : (
            <div
              className="rounded-xl border p-6 text-sm opacity-70"
              style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}
            >
              Envie uma imagem para visualizar a prévia.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium">Paleta principal</div>
          <div className="grid grid-cols-3 gap-3">
            {palette.map((color) => (
              <div
                key={color}
                className="rounded-xl border p-4 flex flex-col items-center gap-3"
                style={{ backgroundColor: "#0f0f0f", borderColor: "#222" }}
              >
                <div className="w-12 h-12 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs" style={{ color: "#ff8020" }}>
                  {color}
                </span>
              </div>
            ))}
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </section>
  );
}
