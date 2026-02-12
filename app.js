const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Esto habilita CORS para TODOS los dominios (perfecto para desarrollo)
app.use(cors());

// Servir la carpeta donde tienes los videos y la playlist (.m3u8 y .ts)
// Asegúrate de que la ruta sea correcta
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(8000, () => {
  console.log("Servidor de video corriendo en http://localhost:8000");
});
