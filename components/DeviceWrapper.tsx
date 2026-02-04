import React, { useState, useEffect, useCallback } from "react";

interface DeviceWrapperProps {
  children: React.ReactNode;
  targetWidth: number;
  targetHeight: number;
}

function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export const DeviceWrapper: React.FC<DeviceWrapperProps> = ({
  children,
  targetWidth,
  targetHeight,
}) => {
  const [zoom, setZoom] = useState(0.55);
  const [isIdle, setIsIdle] = useState(false); // Estado del protector
  const { width, height } = useScreenSize();

  // Configuración: Tiempo de espera (ejemplo: 30 segundos)
  const IDLE_TIME = 30000;

  const resetTimer = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startTimer = () => {
      timer = setTimeout(() => {
        setIsIdle(true);
      }, IDLE_TIME);
    };

    const handleActivity = () => {
      resetTimer();
      clearTimeout(timer);
      startTimer();
    };

    // Eventos que detectan actividad
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    events.forEach((event) => window.addEventListener(event, handleActivity));
    startTimer(); // Iniciar al montar

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
      clearTimeout(timer);
    };
  }, [resetTimer]);

  // Renderizado del contenido principal
  const renderContent = () => (
    <div className="relative w-full h-full">
      {/* Protector de Pantalla (Video) */}
      {isIdle && (
        <div
          onClick={resetTimer} // Al hacer clic, desaparece
          style={{ height: `${targetHeight}px` }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="assets/videos/DJI_20250401173132_0029_D.MP4"
              type="video/mp4"
            />
          </video>
          {/* Texto opcional para invitar a tocar */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <p className="text-white text-8xl font-bold animate-pulse uppercase tracking-tighter">
              Toca para comenzar
            </p>
          </div>
        </div>
      )}

      {/* Contenido de la App */}
      <div className={isIdle ? "hidden" : "block h-full"}>{children}</div>
    </div>
  );

  // Si estamos en la resolución real del kiosco, solo mostramos el contenido con el protector
  if (width === 2160 && height === 3840) {
    return renderContent();
  }

  // Si estamos en modo Preview (Editor/Laptop)
  return (
    <div className="flex flex-col h-screen bg-zinc-900 overflow-hidden">
      <div className="h-14 bg-black border-b border-zinc-700 flex items-center justify-between px-6 z-50 shadow-xl">
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
            Preview Mode
          </span>
          <div className="h-4 w-[1px] bg-zinc-700"></div>
          <span className="text-white font-bold">
            {targetWidth}x{targetHeight}px
          </span>
          {isIdle && (
            <span className="bg-orange-500 text-[10px] px-2 py-0.5 rounded text-black font-black uppercase">
              Screensaver Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-700">
          <button
            onClick={() => setZoom((prev) => Math.max(0.1, prev - 0.05))}
            className="text-white hover:bg-zinc-700 w-8 h-8 rounded-md"
          >
            -
          </button>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-32 accent-green-500"
          />
          <button
            onClick={() => setZoom((prev) => Math.min(1, prev + 0.05))}
            className="text-white hover:bg-zinc-700 w-8 h-8 rounded-md"
          >
            +
          </button>
          <span className="text-white text-sm w-12 text-right">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] flex justify-center items-start">
        <div
          style={{
            width: targetWidth,
            height: targetHeight,
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            marginBottom: `-${targetHeight * (1 - zoom)}px`,
          }}
          className="shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-white ring-1 ring-black flex-shrink-0 relative overflow-hidden"
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
