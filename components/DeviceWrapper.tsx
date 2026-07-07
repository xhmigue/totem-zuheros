import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "./Header";
import { Play, Monitor, RotateCcw, Pause } from "lucide-react";
import { useZuherosStore } from "@/store/kioskStore";
interface DeviceWrapperProps {
  children: React.ReactNode;
  targetWidth: number;
  targetHeight: number;
  widthOverride?: string;
  zoom?: number;
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
  widthOverride,
  zoom: zoomProp,
}) => {
  const isPreview = useZuherosStore((state) => state.isPreview);
  const secondsPreview = useZuherosStore((state) => state.secondsPreview);
  const [zoom, setZoom] = useState(zoomProp || 0.55);
  const [isIdle, setIsIdle] = useState(false); // Estado del protector
  const { width, height } = useScreenSize();

  // Configuración: Tiempo de espera (ejemplo: 30 segundos)
  const IDLE_TIME = secondsPreview * 1000;

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

  // Renderizado del contenido principal ver video
  const renderContent = () => (
    <div className="relative w-full h-full">
      {/* Protector de Pantalla (Video) */}
      {(isIdle || isPreview) && (
        <div
          onClick={resetTimer} // Al hacer clic, desaparece
          style={{ height: `${targetHeight}px` }}
        >
          <div className="font-sans">
            <Header />
            {/* SubHeader */}
            <div
              className="bg-white border-b-4 border-green-100 px-4 py-6 flex justify-between items-center relative"
              style={{ height: `175px` }}
            >
              {/* Título Dinámico Centrado */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[60%]">
                <h2 className="text-[#1c6c3e] text-7xl font-black tracking-tighter uppercase truncate drop-shadow-sm animate-pulse tracking-tighter">
                  Toca para Continuar
                </h2>
              </div>
            </div>
          </div>
          <CarouselPreview />
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="assets/videos/video_final_60fps.mp4"
              type="video/mp4"
            />
          </video> */}
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
    <div
      className={`flex flex-col h-screen bg-zinc-900 overflow-hidden ${widthOverride ?? ""}`}
    >
      <div className="h-14 bg-black border-b border-zinc-700 flex items-center justify-between px-6 z-50 shadow-xl">
        <div className="flex items-center gap-4">
          <span className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
            Previsualización
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

const ASPECT_RATIO_CLASS = "aspect-[9/16]";

const CarouselPreview: React.FC = () => {
  const items = useZuherosStore((state) => state.items);
  const [activeIndex, setActiveIndex] = useState(0);
  const [actualVideoDuration, setActualVideoDuration] = useState<number>(0);
  const [playKey, setPlayKey] = useState(0); // Clave para reiniciar animaciones y efectos
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<any>(null);

  // Función para avanzar al siguiente slide
  const nextStep = () => {
    if (items.length <= 1) {
      setPlayKey((prev) => prev + 1); // Reiniciar el mismo si solo hay uno
      return;
    }
    setActiveIndex((current) =>
      current + 1 >= items.length ? 0 : current + 1,
    );
    setPlayKey((prev) => prev + 1);
  };

  // Efecto principal de control de tiempo
  useEffect(() => {
    if (items.length === 0 || !isPlaying) return;

    const currentItem = items[activeIndex];
    if (timerRef.current) clearTimeout(timerRef.current);

    // Lógica para IMÁGENES
    if (currentItem.type === "image") {
      const time = (currentItem.duration || 5) * 1000;
      timerRef.current = setTimeout(nextStep, time);
    }
    // Lógica para VIDEOS con duración personalizada
    else if (currentItem.type === "video" && currentItem.duration > 0) {
      const time = currentItem.duration * 1000;
      timerRef.current = setTimeout(nextStep, time);
    }
    // Si el video es duración 0, el evento onEnded del tag <video> maneja el cambio

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, items, playKey, isPlaying]);

  const handleManualSelect = (index: number) => {
    setActiveIndex(index);
    setPlayKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  const getObjectPosition = (pos: string) => {
    switch (pos) {
      case "left":
        return "left center";
      case "right":
        return "right center";
      default:
        return "center center";
    }
  };

  const getEffectiveDuration = () => {
    const currentItem = items[activeIndex];
    if (!currentItem) return 5;
    if (currentItem.type === "image") return currentItem.duration;
    if (currentItem.type === "video") {
      return currentItem.duration > 0
        ? currentItem.duration
        : actualVideoDuration || 10;
    }
    return 5;
  };

  return (
    <div className="w-full h-full relative">
      {items.length > 0 && (
        <div className="w-full h-full relative">
          {items.map((item, index) =>
            item.type === "image" ? (
              <img
                src={item.url}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: getObjectPosition(item.position),
                }}
              />
            ) : (
              <video
                ref={activeIndex === index ? videoRef : null}
                src={item.url}
                autoPlay={activeIndex === index && isPlaying}
                muted
                playsInline
                onLoadedMetadata={(e) =>
                  setActualVideoDuration(e.currentTarget.duration)
                }
                onEnded={() => {
                  if (item.duration === 0) nextStep();
                }}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: getObjectPosition(item.position),
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};
