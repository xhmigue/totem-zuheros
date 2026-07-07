import React, { useState, useEffect, useRef } from "react";
import {
  Trash2,
  Clock,
  Image as ImageIcon,
  Video as VideoIcon,
  Play,
  Monitor,
  Settings,
  Plus,
  RotateCcw,
  Pause,
} from "lucide-react";
import { useZuherosStore } from "@/store/kioskStore";

const ASPECT_RATIO_CLASS = "aspect-[9/16]";

interface MediaItem {
  id: string;
  type: "image" | "video";
  name: string;
  url: string;
  position: "left" | "center" | "right";
  duration: number; // 0 para videos significa "reproducir completo"
}

const CarouselEditor: React.FC = () => {
  const setItems = useZuherosStore((state) => state.setItems);
  const items = useZuherosStore((state) => state.items);
  const isPreview = useZuherosStore((state) => state.isPreview);
  const setIsPreview = useZuherosStore((state) => state.setIsPreview);
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

  const handleAddMedia = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newItem: MediaItem = {
      id: crypto.randomUUID(),
      type: type,
      name: file.name,
      url: URL.createObjectURL(file),
      position: "center",
      duration: type === "video" ? 0 : 5,
    };

    setItems([...items, newItem]);
    if (items.length === 0) {
      setActiveIndex(0);
      setPlayKey((prev) => prev + 1);
    }
    e.target.value = ""; // Reset input
  };

  const updateItem = (id: string, field: keyof MediaItem, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);
    if (activeIndex >= newItems.length) {
      setActiveIndex(0);
      setPlayKey((prev) => prev + 1);
    }
  };

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
    <div className="max-w-7xl mx-auto flex flex-col gap-12 animate-in fade-in slide-in-from-top-4 duration-500 pb-20 px-4">
      {/* SECCIÓN CONFIGURACIÓN */}
      <div className="flex-1 flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight">
              Configuración de Pantalla
            </h2>
            <p className="text-slate-500 text-xl mt-2 font-medium">
              Sube y organiza el contenido para el modo protector.
            </p>
          </div>

          {/* Toggle estilizado y alineado */}
          <div className="flex items-center gap-4 p-3 pr-5 bg-slate-50 border border-slate-200 rounded-2xl transition-all hover:bg-white hover:shadow-md group">
            <button
              id="video-toggle"
              onClick={() => setIsPreview(!isPreview)}
              className={`
            relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${isPreview ? "bg-blue-600 shadow-inner" : "bg-slate-300"}
          `}
            >
              <span
                className={`
              inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300
              ${isPreview ? "translate-x-6" : "translate-x-1"}
            `}
              />
            </button>
            <div className="flex flex-col">
              <label
                htmlFor="video-toggle"
                className="text-xs font-black text-slate-700 uppercase tracking-wider cursor-pointer"
              >
                Previsualización
              </label>
              <span
                className={`text-[10px] font-bold uppercase ${isPreview ? "text-blue-600" : "text-slate-400"}`}
              >
                {isPreview ? "Activa" : "Desactivada"}
              </span>
            </div>
          </div>
        </header>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
          {/* BOTONES DE SUBIDA */}
          <div className="flex flex-wrap gap-4">
            <MediaButton
              onUpload={(e) => handleAddMedia(e, "image")}
              icon={<ImageIcon size={22} />}
              label="Sólo Imágenes"
              color="bg-blue-600"
              accept="image/*"
            />
            <MediaButton
              onUpload={(e) => handleAddMedia(e, "video")}
              icon={<VideoIcon size={22} />}
              label="Sólo Videos"
              color="bg-indigo-600"
              accept="video/*"
            />
          </div>

          {/* LISTADO DE ITEMS */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`group flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl border-2 transition-all duration-300 ${
                  activeIndex === index
                    ? "border-emerald-500 bg-emerald-50/40 shadow-lg shadow-emerald-500/5"
                    : "border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-200"
                }`}
              >
                {/* MINIATURA CON LÓGICA DE PREVIEW */}
                <div
                  onClick={() => handleManualSelect(index)}
                  className={`w-28 ${ASPECT_RATIO_CLASS} bg-slate-200 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border-2 border-white cursor-pointer group-hover:scale-105 transition-transform relative`}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: getObjectPosition(item.position),
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white relative">
                      {/* Si el preview está activo, aquí podrías renderizar un <video muted autoPlay loop /> */}
                      <VideoIcon
                        size={24}
                        className={
                          isPreview ? "animate-pulse text-blue-400" : ""
                        }
                      />
                      <div className="absolute top-2 left-2 bg-emerald-500 p-1 rounded-md">
                        <Play size={10} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>

                {/* CONTROLES DE ITEM (DURACIÓN Y AJUSTE) */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Duración (0 = Completo)
                    </label>
                    <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200 focus-within:border-emerald-500 transition-all">
                      <Clock size={18} className="text-slate-400" />
                      <input
                        type="number"
                        min="0"
                        value={item.duration}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "duration",
                            Number(e.target.value),
                          )
                        }
                        className="w-full font-black text-slate-800 outline-none bg-transparent"
                      />
                      {item.type === "video" && item.duration === 0 && (
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md uppercase">
                          FULL
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                      Ajuste Visual
                    </label>
                    <div className="flex p-1 bg-white rounded-2xl border border-slate-200">
                      {["left", "center", "right"].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => updateItem(item.id, "position", pos)}
                          className={`flex-1 text-[10px] font-black py-2.5 rounded-xl transition-all ${
                            item.position === pos
                              ? "bg-slate-900 text-white shadow-lg"
                              : "text-slate-400 hover:bg-slate-50"
                          }`}
                        >
                          {pos.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BOTONES ACCIÓN ITEM */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleManualSelect(index)}
                    className={`p-4 rounded-2xl transition-all shadow-md ${
                      activeIndex === index
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-slate-400 hover:text-emerald-500"
                    }`}
                  >
                    <Play
                      size={24}
                      fill={activeIndex === index ? "currentColor" : "none"}
                    />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-4 bg-white text-slate-400 hover:text-red-500 rounded-2xl shadow-md hover:shadow-red-100 transition-all"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center py-28 border-4 border-dashed border-slate-100 rounded-[3rem] bg-white">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                  <Monitor size={48} className="text-slate-200" />
                </div>
                <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tight text-slate-400">
                  Galería Vacía
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MediaButtonProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  label: string;
  color: string;
  accept: string;
}

const MediaButton: React.FC<MediaButtonProps> = ({
  onUpload,
  icon,
  label,
  color,
  accept,
}) => (
  <label
    className={`flex items-center gap-4 px-10 py-6 ${color} text-white rounded-[2rem] cursor-pointer hover:brightness-110 hover:shadow-2xl active:scale-95 transition-all text-sm font-black shadow-xl uppercase tracking-widest border-b-4 border-black/20`}
  >
    {icon} {label}
    <input type="file" className="hidden" accept={accept} onChange={onUpload} />
  </label>
);

export default CarouselEditor;
