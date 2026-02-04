import React, { useState, useEffect } from "react";
// ... Tus otros imports (Header, SubHeader, etc) ...
import { ZUHEROS_DATA } from "../navigationData";
import { NavigationNode, NavigationState } from "../types";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import NavigationGrid from "../components/NavigationGrid";
import DetailView from "../components/DetailView";
function useScreenSize() {
  // 2160px x 3840px

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,

    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,

        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Limpieza al desmontar el componente

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

// Modifica tu componente para recibir dimensiones opcionales
export const AppPreview: React.FC<{
  forcedWidth?: number;
  forcedHeight?: number;
}> = ({ forcedWidth, forcedHeight }) => {
  const { width: realWidth, height: realHeight } = useScreenSize();

  // Usamos las forzadas si existen, si no, las reales del navegador
  const width = forcedWidth || realWidth;
  const height = forcedHeight || realHeight;
  const [navState, setNavState] = useState<NavigationState>({
    currentNode: ZUHEROS_DATA,
    history: [],
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNodeSelect = (node: NavigationNode, title: string) => {
    setNavState((prev) => ({
      currentNode: node,
      history: [...prev.history, prev.currentNode],
    }));
  };

  const handleGoBack = () => {
    if (navState.history.length === 0) return;

    const newHistory = [...navState.history];
    const previousNode = newHistory.pop()!;

    setNavState({
      currentNode: previousNode,
      history: newHistory,
    });
  };

  const handleGoHome = () => {
    setNavState({
      currentNode: ZUHEROS_DATA,
      history: [],
    });
  };

  const isHome = navState.history.length === 0;

  return (
    <div
      className="flex flex-col h-screen w-full bg-[#f8fafc] overflow-hidden font-sans"
      style={{ height: "100%" }}
    >
      <Header date={currentTime} />

      <SubHeader
        onBack={handleGoBack}
        onHome={handleGoHome}
        isHome={isHome}
        title={
          navState.currentNode.tituloGeneral ?? navState.currentNode.titulo
        }
      />

      {navState.currentNode.tituloGeneral && (
        <div className="bg-white border-b-4 border-green-100 px-10 py-6 flex justify-between items-center relative shadow-sm">
          {/* Título Dinámico Centrado */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h2 className="text-[#1c6c3e] text-5xl font-black tracking-tighter uppercase truncate drop-shadow-sm">
              {navState.currentNode.titulo}
            </h2>
          </div>
          <div className={`m-6`}></div>
        </div>
      )}
      <main className="relative flex-1 overflow-y-auto custom-scrollbar">
        {/* CONTENIDO (Z-10 para estar sobre el video) */}
        <div className="relative z-10 p-10" style={{ height: "3055px" }}>
          {navState.currentNode.tipo === "submenu" ? (
            <NavigationGrid
              options={navState.currentNode.opciones || []}
              onSelect={handleNodeSelect}
            />
          ) : (
            <DetailView node={navState.currentNode} onBack={handleGoBack} />
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
