
import React from 'react';
import { IMAGES } from '../assets';

interface HeaderProps {
  date: Date;
}

const Header: React.FC<HeaderProps> = ({ date }) => {
  const formatDate = (d: Date) => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dayName = days[d.getDay()];
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const time = d.toLocaleTimeString('es-ES', { hour12: false });
    
    return { dayName, fullDate: `${day}-${month}-${year}`, time };
  };

  const { dayName, fullDate, time } = formatDate(date);

  return (
    <header className="flex flex-col w-full shadow-2xl z-30">
      {/* 1. Franja Superior Institucional (Blanca) */}
      <div className="bg-white flex justify-between items-center px-12 py-5 border-b-2 border-gray-100">
        {/* Logo Ayuntamiento */}
        <div className="flex items-center gap-6">
          <img 
            src={IMAGES.AYUNTAMIENTO} 
            alt="Ayuntamiento de Zuheros" 
            className="h-24 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-[#e30613] font-bold text-3xl leading-none">Ayuntamiento de</span>
            <span className="text-[#e30613] font-black text-7xl leading-none tracking-tighter">Zuheros</span>
          </div>
        </div>

        {/* Logos Financiadores */}
        <div className="flex items-center gap-12">
          <img src={IMAGES.PLAN_RECUPERACION} alt="Plan de Recuperación" className="h-16 object-contain" />
          <img src={IMAGES.GOBIERNO_ESPANA} alt="Gobierno de España" className="h-16 object-contain" />
          <img src={IMAGES.JUNTA_ANDALUCIA} alt="Junta de Andalucía" className="h-16 object-contain" />
          <img src={IMAGES.UNION_EUROPEA} alt="Next Generation EU" className="h-20 object-contain" />
        </div>
      </div>

      {/* 2. Banner Principal de Identidad (Verde Zuheros) */}
      <div className="bg-[#1c6c3e] text-white flex items-center justify-between px-12 py-8 relative overflow-hidden">
        {/* Decoración sutil de fondo */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 transform skew-x-12 translate-x-1/2"></div>
        
        <div className="flex items-center gap-10 relative z-10">
          {/* El Icono Amarillo del Castillo */}
          <div className="bg-[#d4e11d] rounded-2xl p-0 w-36 h-36 flex items-center justify-center shadow-2xl border-4 border-white/30 overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500">
             <img 
               src={IMAGES.ICONO_CASTILLO} 
               alt="Zuheros Icono" 
               className="w-full h-full object-cover scale-110"
             />
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-7xl font-black tracking-tighter drop-shadow-2xl uppercase">Punto de Información</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-[#d4e11d] text-[#1c6c3e] font-black px-4 py-1.5 rounded-lg text-lg uppercase tracking-[0.2em]">ZUHEROS</span>
              <span className="text-[#d4e11d] font-bold text-3xl tracking-wide italic opacity-90 uppercase">Villa y Señorío de Zuheros</span>
            </div>
          </div>
        </div>

        {/* 3. Módulo de Tiempo (Totem Optimized) */}
        <div className="text-right flex flex-col items-end pr-4 relative z-10">
          <div className="bg-black/30 px-8 py-5 rounded-[2.5rem] backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="text-3xl font-bold capitalize text-[#d4e11d] mb-1">{dayName}</div>
            <div className="text-4xl font-black text-white leading-none">{fullDate}</div>
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
