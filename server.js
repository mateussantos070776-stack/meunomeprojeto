const express = require("express");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "troque-este-token";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CONTENT_FILE = path.join(__dirname, "data", "content.json");
const STATIC_DIR = path.join(__dirname, "meunomeprojeto");

app.use(express.json({ limit: "1mb" }));

const readContent = () => {
    try {
        const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
        return JSON.parse(raw || "{}");
    } catch (error) {
        return {};
    }
};

const writeContent = (data) => {
    fs.mkdirSync(path.dirname(CONTENT_FILE), { recursive: true });
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2));
};

app.get("/api/content", (_req, res) => {
    const data = readContent();
    res.json(data);
});

app.post("/api/content", (req, res) => {
    const token = req.header("x-admin-token");
    if (!token || token !== ADMIN_TOKEN) {
        return res.status(401).json({ error: "unauthorized" });
    }

    const payload = req.body;
    if (!payload || typeof payload !== "object") {
        return res.status(400).json({ error: "invalid_payload" });
    }

    writeContent(payload);
    return res.json({ ok: true });
});

app.post("/api/lux-scan", async (req, res) => {
    if (!OPENAI_API_KEY) {
        return res.status(500).json({ error: "missing_api_key" });
    }

    const { text } = req.body || {};
    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "invalid_text" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                input: [
                    {
                        role: "system",
                        content: [
                            {
                                type: "text",
                                text:
                                    "Você é um revisor de texto premium. Reescreva TODO o texto recebido em português do Brasil com linguagem sofisticada, elegante e de alto padrão, mantendo o sentido original. Substitua todas as expressões comuns por alternativas premium sempre que possível. Devolva apenas o texto final, sem aspas, sem lista e sem explicações.",
                            },
                        ],
                    },
                    {
                        role: "user",
                        content: [{ type: "text", text }],
                    },
                ],
                temperature: 0.6,
            }),
        });

        if (!response.ok) {
            return res.status(500).json({ error: "openai_error" });
        }

        const data = await response.json();
        const output = data?.output?.[0]?.content?.[0]?.text || data?.output_text || "";
        if (!output) {
            return res.status(500).json({ error: "empty_output" });
        }

        return res.json({ output });
    } catch (error) {
        return res.status(500).json({ error: "request_failed" });
    }
});

app.use(express.static(STATIC_DIR));

app.get("*", (_req, res) => {
    res.sendFile(path.join(STATIC_DIR, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
