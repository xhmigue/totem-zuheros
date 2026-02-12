const { app, BrowserWindow } = require("electron");
const path = require("path");

// Deshabilitar la aceleración por software para forzar la GPU
app.disableHardwareAcceleration(false);

function createWindow() {
  const win = new BrowserWindow({
    width: 2160,
    height: 3840,
    fullscreen: true,
    kiosk: true, // Bloquea el sistema para que solo se vea tu app
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false, // Evita que el video se trabe al "minimizar"
    },
  });

  // Banderas para Chrome interno (Intel Alder Lake optimization)
  app.commandLine.appendSwitch("ignore-gpu-blocklist");
  app.commandLine.appendSwitch("enable-gpu-rasterization");
  app.commandLine.appendSwitch("enable-accelerated-video-decode");
  app.commandLine.appendSwitch("use-gl", "desktop");

  // Carga tu app de React (ajusta la ruta si ya hiciste npm run build)
  win.loadURL("http://localhost:8080/preview-kiosk");
}

app.whenReady().then(createWindow);
