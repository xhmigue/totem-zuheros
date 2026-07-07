import React from "react";
// Importa las herramientas de navegación
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppEditor } from "./routes/AppEditor";
import { AppPreview } from "./routes/AppPreview";
import { DeviceWrapper } from "./components/DeviceWrapper";
import AppStatsPanel from "./routes/AppStatsPanel";
import KioskPlayer from "./components/KioskPlayer";

// --- COMPONENTE HOME ---
const Home: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-[#1c6c3e] mb-2 uppercase tracking-tighter">
          Panel de Control Kiosco
        </h1>
        <p className="text-slate-500 text-xl">Selecciona el modo de trabajo</p>
      </div>

      <div className="flex gap-10">
        {/* Card Editor */}
        <Link
          to="/editor/2"
          className="group w-80 p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#1c6c3e] text-center"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
            📝
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Editor JSON</h2>
          <p className="text-gray-500">
            Modifica el contenido, rutas y estructura de los datos.
          </p>
        </Link>

        {/* Card Preview */}
        <Link
          to="/preview-kiosk"
          className="group w-80 p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#1c6c3e] text-center"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
            🖥️
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Vista Previa del Kiosco
          </h2>
          <p className="text-gray-500">
            Visualiza el kiosco tal como lo verán los usuarios.
          </p>
        </Link>
      </div>
    </div>
  );
};

// Ejemplo de tu router
// --- COMPONENTE PRINCIPAL CON RUTAS ---
const App: React.FC = () => {
  return (
    <Router basename={process.env.BASE_NAME}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:idNodo" element={<AppEditor />} />
        <Route path="/stats" element={<AppStatsPanel />} />
        <Route path="/preview-kiosk" element={<AppPreview />} />
        <Route
          path="/video"
          element={
            <KioskPlayer
              src={"http://localhost:3000/documents_access/playlist.m3u8"}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
