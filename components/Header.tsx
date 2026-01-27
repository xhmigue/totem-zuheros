import React from "react";
import { IMAGES } from "../assets";
import FlexLayout from "./GlobalComponents";

interface HeaderProps {
  date: Date;
}

const urlPanel = process.env.PROD
  ? "https://zuheros.es"
  : "http://localhost:8000";
const Header: React.FC<HeaderProps> = ({ date }) => {
  const formatDate = (d: Date) => {
    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const dayName = days[d.getDay()];
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const time = d.toLocaleTimeString("es-ES", { hour12: false });

    return { dayName, fullDate: `${day}-${month}-${year}`, time };
  };

  const { dayName, fullDate, time } = formatDate(date);

  return (
    <header className="flex flex-col w-full shadow-2xl z-30">
      {/* Equivalente a un Row de Flutter */}
      <FlexLayout
        direction="row"
        mainAxisAlignment="spaceBetween"
        spacing={4}
        mainAxisSize="max"
        className="py-5"
      >
        {[
          ["logo_financiado_union_europea.webp", "Junta de Andalucía"],
          ["logo_gobierno_espana.png", "Gobierno de espana"],
          ["logo_junta_andalucia.png", "Junta de Andalucía"],
          [
            "logo_plan_recuperacion_transformacion_resiliencia.png",
            "Plan de recuperacion",
          ],
          ["logo_escudo_zuheros.png", "Escudo Zuheros"],
        ].map(([logo, alt], i) => (
          <img
            key={i}
            src={`${urlPanel}/assets/zuheros/logos/${logo}`}
            alt={alt}
            className="h-16 object-contain"
          />
        ))}
      </FlexLayout>

      {/* 2. Banner Principal de Identidad (Verde Zuheros) */}
      <div className="bg-[#1c6c3e] text-white flex items-center justify-between px-12 py-8 relative overflow-hidden">
        {/* Decoración sutil de fondo */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-1/2"></div>

        {/* El Icono Amarillo del Castillo */}
        <div className="bg-[#d4e11d] rounded-2xl p-0 w-40 flex items-center justify-center shadow-2xl border-4 border-white/30 overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <img
            src={`${urlPanel}/assets/zuheros/logos/logo_zuheros.png`}
            alt="Zuheros Icono"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-7xl font-black tracking-tighter drop-shadow-2xl uppercase">
            Punto de Información
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[#d4e11d] font-bold text-3xl tracking-wide italic opacity-90 uppercase">
              Villa y Señorío de Zuheros
            </span>
          </div>
        </div>

        {/* 3. Módulo de Tiempo (Totem Optimized) */}
        <div className="text-right flex flex-col items-center pr-4 relative z-10">
          <div className="bg-black/30 px-8 py-5 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-2xl text-center">
            <div className="text-3xl font-bold capitalize text-[#d4e11d] mb-1">
              {dayName}
            </div>
            <div className="text-4xl font-black text-white leading-none">
              {fullDate}
            </div>
            <div className="text-6xl font-black tabular-nums tracking-tighter mt-3 text-white border-t-2 border-[#d4e11d]/50 pt-3">
              {time}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
