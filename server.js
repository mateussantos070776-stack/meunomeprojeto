const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "troque-este-token";
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

app.use(express.static(STATIC_DIR));

app.get("*", (_req, res) => {
    res.sendFile(path.join(STATIC_DIR, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
