import React, { useState, useEffect, useRef } from "react";
import {
  Trash2,
  Clock,
  Image as ImageIcon,
  Video as VideoIcon,
  Play,
  Monitor,
} from "lucide-react";
import KioskPlayer from "./KioskPlayer";

const ASPECT_RATIO_CLASS = "aspect-[9/16]";

const CarouselEditor = () => {
  // --- ESTADO INTERNO ---
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // --- LÓGICA DE REPRODUCCIÓN ---
  const nextStep = () => {
    setItems((prevItems) => {
      if (prevItems.length === 0) return prevItems;
      setActiveIndex((current) =>
        current + 1 >= prevItems.length ? 0 : current + 1,
      );
      return prevItems;
    });
  };

  useEffect(() => {
    if (items.length === 0) return;

    const currentItem = items[activeIndex];

    // Limpiar timer anterior
    if (timerRef.current) clearTimeout(timerRef.current);

    if (currentItem.type === "image") {
      timerRef.current = setTimeout(
        () => {
          nextStep();
        },
        (currentItem.duration || 5) * 1000,
      );
    }
    // Si es video, el cambio se dispara por onEnded en el componente video

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, items]);

  // --- MANEJADORES DE ARCHIVOS ---
  const handleAddMedia = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const newItem = {
      id: crypto.randomUUID(),
      type: type,
      url: URL.createObjectURL(file),
      position: "center", // left, center, right
      duration: type === "video" ? 10 : 5, // Duración default
    };

    setItems([...items, newItem]);
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeItem = (id) => {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
    if (activeIndex >= newItems.length) setActiveIndex(0);
  };

  const selectItem = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 🛠 SECCIÓN IZQUIERDA: CONFIGURADOR */}
      <div className="flex-1 space-y-6">
        <header className="bg-white p-3 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Kiosk Media Manager
              </h1>
              <p className="text-slate-500 text-sm">
                Contenido vertical para protector de pantalla (2160x3840)
              </p>
            </div>
            <div className="flex gap-2">
              <MediaButton
                onUpload={(e) => handleAddMedia(e, "image")}
                icon={<ImageIcon size={18} />}
                label="+ Imagen"
                color="bg-blue-600"
              />
              <MediaButton
                onUpload={(e) => handleAddMedia(e, "video")}
                icon={<VideoIcon size={18} />}
                label="+ Video"
                color="bg-indigo-600"
              />
            </div>
          </div>

          {/* LISTA DE MEDIOS */}
          <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  activeIndex === index
                    ? "border-blue-500 bg-blue-50/30"
                    : "border-slate-100 bg-white"
                }`}
              >
                <div
                  className={`w-20 ${ASPECT_RATIO_CLASS} bg-slate-200 rounded-lg overflow-hidden flex-shrink-0 shadow-inner`}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: item.position }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white">
                      <VideoIcon size={12} />
                    </div>
                  )}
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      Duración (seg)
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={14} className="text-slate-400" />
                      <input
                        type="number"
                        value={item.duration}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "duration",
                            Number(e.target.value),
                          )
                        }
                        className="w-full p-1 text-sm font-bold border-b border-slate-200 focus:border-blue-500 outline-none bg-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">
                      Encuadre
                    </label>
                    <div className="flex gap-1 mt-1">
                      {["left", "center", "right"].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => updateItem(item.id, "position", pos)}
                          className={`flex-1 text-[9px] font-bold py-1 rounded-md transition-all ${
                            item.position === pos
                              ? "bg-slate-800 text-white"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                          }`}
                        >
                          {pos.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => selectItem(index)}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <Play size={18} />
                </button>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
                <Monitor size={40} className="mx-auto text-slate-200 mb-2" />
                <p className="text-slate-400 text-sm italic">
                  No hay archivos cargados. Empieza agregando una imagen o
                  video.
                </p>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* 📱 SECCIÓN DERECHA: PREVIEW 4K VERTICAL */}
      <div className="w-full xl:w-[450px] flex-shrink-0">
        <div className="sticky top-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 italic">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              LIVE PREVIEW
            </h3>
            <span className="text-[10px] bg-slate-200 px-2 py-1 rounded-full font-bold">
              9:16 ASPECT RATIO
            </span>
          </div>

          {/* CONTENEDOR DE PANTALLA */}
          <div
            className={`relative w-full ${ASPECT_RATIO_CLASS} bg-black rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border-[12px] border-slate-900 shadow-2xl`}
          >
            {items.length > 0 ? (
              <div className="w-full h-full relative">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      activeIndex === index
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: item.position }}
                      />
                    ) : (
                      <video
                        ref={activeIndex === index ? videoRef : null}
                        src={item.url}
                        autoPlay={activeIndex === index}
                        muted
                        onEnded={nextStep}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: item.position }}
                      />
                    )}
                  </div>
                ))}

                {/* BARRA DE PROGRESO INFERIOR */}
                <div className="absolute bottom-12 left-8 right-8 z-20">
                  <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] font-black text-white tracking-widest uppercase opacity-80">
                        Slide {activeIndex + 1} / {items.length}
                      </p>
                      <Play size={10} className="text-white fill-current" />
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        key={activeIndex} // Re-lanza la animación al cambiar de slide
                        className="bg-white h-full transition-all ease-linear"
                        style={{
                          animation: `progress ${items[activeIndex]?.type === "image" ? items[activeIndex]?.duration : videoRef.current?.duration || 10}s linear forwards`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                <Monitor size={60} strokeWidth={1} />
                <p className="text-xs font-medium uppercase tracking-widest animate-pulse">
                  Waiting for content...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

const MediaButton = ({ onUpload, icon, label, color }) => (
  <label
    className={`flex items-center gap-2 px-4 py-2 ${color} text-white rounded-xl cursor-pointer hover:brightness-110 active:scale-95 transition-all text-xs font-bold shadow-lg shadow-blue-900/10`}
  >
    {icon} {label}
    <input
      type="file"
      className="hidden"
      accept="image/*,video/*"
      onChange={onUpload}
    />
  </label>
);

export default CarouselEditor;
