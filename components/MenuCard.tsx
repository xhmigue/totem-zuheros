
import React from 'react';
import { MenuSection } from '../types';

interface MenuCardProps {
  label: MenuSection;
  onClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ label, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-[#1c6c3e] rounded-[2.5rem] p-10 flex flex-col items-center justify-center h-[380px] shadow-2xl active:scale-95 transition-all cursor-pointer border-8 border-transparent hover:border-[#d4e11d] overflow-hidden"
    >
      {/* Icono decorativo estilo mapa */}
      <div className="absolute -top-6 bg-[#d4e11d] w-36 h-36 rounded-full border-[10px] border-white shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
        <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#1c6c3e]">
          <path 
            d="M30 70 L50 30 L70 70 Z" 
            fill="currentColor" 
            stroke="white" 
            strokeWidth="2"
          />
          <circle cx="50" cy="45" r="10" fill="white" opacity="0.5" />
        </svg>
      </div>

      <h3 className="text-white text-4xl font-black text-center mt-20 leading-tight uppercase px-4 drop-shadow-md">
        {label}
      </h3>

      {/* Indicador inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#d4e11d] transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
      
      {/* Brillo de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default MenuCard;
