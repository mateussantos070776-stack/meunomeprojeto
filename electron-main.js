const { app, BrowserWindow } = require("electron");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 4321;
const HOST = `http://127.0.0.1:${PORT}`;

let serverStarted = false;

const startServer = () => {
  if (serverStarted) return;
  process.env.PORT = String(PORT);
  require(path.join(__dirname, "server.js"));
  serverStarted = true;
};

const waitForServer = (tries = 30) =>
  new Promise((resolve, reject) => {
    const attempt = (left) => {
      const req = http.get(HOST, (res) => {
        res.resume();
        resolve();
      });

      req.on("error", () => {
        if (left <= 0) {
          reject(new Error("Servidor não iniciou a tempo."));
          return;
        }
        setTimeout(() => attempt(left - 1), 300);
      });
    };

    attempt(tries);
  });

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 680,
    autoHideMenuBar: true,
    title: "Central de Estudos Bíblicos",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  startServer();

  try {
    await waitForServer();
    await win.loadURL(HOST);
  } catch (error) {
    const failHtml = `
      <html>
        <body style="font-family:Segoe UI,Arial,sans-serif;padding:24px;background:#f5f7fb;color:#0f172a;">
          <h2>Erro ao iniciar o app</h2>
          <p>Não foi possível iniciar o servidor local.</p>
          <p><b>Detalhe:</b> ${String(error.message || error)}</p>
        </body>
      </html>`;
    await win.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(failHtml)}`);
  }
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
