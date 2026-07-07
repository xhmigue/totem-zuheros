import React from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import NavigationGrid from "../components/NavigationGrid";
import DetailView from "../components/DetailView";
import { DeviceWrapper } from "@/components/DeviceWrapper";
import { findNodeByIdAndNameParent, useZuherosStore } from "@/store/kioskStore";

// En tu sistema de rutas o App principal
export const AppPreview = ({
  widthOverride,
  zoom,
}: {
  widthOverride?: string;
  zoom?: number;
}) => (
  <DeviceWrapper
    targetWidth={2160}
    targetHeight={3840}
    widthOverride={widthOverride}
    zoom={zoom}
  >
    <KioskPreview />
  </DeviceWrapper>
);
// Modifica tu componente para recibir dimensiones opcionales
export const KioskPreview: React.FC = () => {
  // Suscribirse al store
  const data = useZuherosStore((state) => state.data);
  const idNodo = useZuherosStore((state) => state.idNodo);
  const currentNodeId = useZuherosStore((state) => state.currentNodeId);
  const historyIds = useZuherosStore((state) => state.historyIds);

  // Acciones
  const navigate = useZuherosStore((state) => state.navigate);
  const goBack = useZuherosStore((state) => state.goBack);
  const goHome = useZuherosStore((state) => state.goHome);

  // Obtener el nodo actual reactivamente buscando en el árbol de data
  // Cada vez que 'data' o 'currentNodeId' cambien, esto se recalcula
  const { node, nameParent } = findNodeByIdAndNameParent(
    data,
    currentNodeId,
    "",
  ) || {
    node: data,
    nameParent: "",
  };
  const isHome = historyIds.length === 0;
  return (
    <div
      className="flex flex-col w-full bg-[#f8fafc] overflow-hidden font-sans"
      style={{ height: "100%" }}
    >
      <Header />
      <SubHeader
        onBack={goBack}
        onHome={goHome}
        isHome={isHome}
        title={node.tipo === "text" ? nameParent : node.titulo}
      />
      {node.tipo === "text" ? (
        <div className="bg-white border-b-4 border-green-100 px-10 py-6 flex justify-between items-center relative shadow-sm">
          {/* Título Dinámico Centrado */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h2 className="text-[#1c6c3e] text-5xl font-black tracking-tighter uppercase truncate drop-shadow-sm">
              {node.titulo}
            </h2>
          </div>
          <div className={`m-6`}></div>
        </div>
      ) : (
        ""
      )}
      <main className="relative flex-1 overflow-y-auto custom-scrollbar">
        {/* CONTENIDO (Z-10 para estar sobre el video) */}
        <div className="relative z-10 p-10" style={{ height: "3055px" }}>
          {node.tipo === "submenu" ? (
            <NavigationGrid
              options={node.opciones || []}
              onSelect={(node) => navigate(node.id)} // Usamos el ID para navegar
              idNodo={idNodo}
            />
          ) : (
            <DetailView node={node} onBack={goBack} />
          )}
        </div>
      </main>

      <footer className="h-6 bg-[#1c6c3e] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1c6c3e;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};
