import React from "react";
import { NavigationNode } from "../types";

interface NavigationGridProps {
  options: NavigationNode[];
  onSelect: (node: NavigationNode, title: string) => void;
}

const NavigationGrid: React.FC<NavigationGridProps> = ({
  options,
  onSelect,
}) => {
  return (
    <>
      {/* Capa de Video */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ height: "100%" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full object-cover"
          style={{ height: "100%" }}
        >
          <source
            src="assets/videos/DJI_20250401173132_0029_D.MP4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-14 p-10">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option, option.titulo)}
            className="group relative bg-white rounded-[3rem] p-12 flex flex-col items-center justify-center min-h-[420px] active:scale-95 transition-all duration-300 border-b-8 border border-[#34c371] overflow-hidden"
          >
            {/* Logo/Imagen del botón */}
            <div className="w-full h-[500px] rounded-[2rem] bg-gray-50 flex items-center justify-center mb-8 overflow-hidden shadow-inner border border-gray-100 group-hover:scale-105 transition-transform">
              {getLogo(option.logo, option.tipoLogo, option.titulo)}
            </div>
            <div className="w-full h-[150px] flex items-center justify-center">
              <span className="text-6xl font-black text-[#1c6c3e] uppercase text-center leading-tight drop-shadow-sm group-hover:text-[#1c6c3e]/80">
                {option.titulo}
              </span>
            </div>

            {/* Efecto de brillo táctil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>
    </>
  );
};

const getLogo = (
  logo: string,
  tipoLogo: "image" | "icon" | "video" | "url",
  titulo: string,
) => {
  if (tipoLogo === "video") {
    return (
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
    );
  } else if (tipoLogo === "image" || tipoLogo === "url") {
    return (
      <img
        src={tipoLogo === "url" ? logo : `assets/images/${logo}`}
        alt={titulo}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://cdn-icons-png.flaticon.com/512/2942/2942001.png";
        }}
      />
    );
  } else {
    return "";
  }
};

export default NavigationGrid;
