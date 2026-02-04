import React from "react";
// Importa las herramientas de navegación
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppEditor } from "./AppEditor";
import { AppPreview } from "./routes/AppPreview";
import { DeviceWrapper } from "./components/DeviceWrapper";
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
          to="/editor"
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

// En tu sistema de rutas o App principal
const KioskView = () => (
  <DeviceWrapper targetWidth={2160} targetHeight={3840}>
    <AppPreview forcedWidth={2160} forcedHeight={3840} />
  </DeviceWrapper>
);

// Ejemplo de tu router
// <Route path="/preview-kiosk" element={<KioskPreviewPage />} />
// --- COMPONENTE PRINCIPAL CON RUTAS ---
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<AppEditor />} />
        <Route path="/preview-kiosk" element={<KioskView />} />
        <Route
          path="/video"
          element={
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://turismologrosan.com/wp-content/uploads/2023/06/Montaje_Logrosan_HD_Comp.mp4"
                type="video/mp4"
              />
            </video>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
