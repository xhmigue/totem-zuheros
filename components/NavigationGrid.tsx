
import React from 'react';
import { NavigationNode } from '../types';

interface NavigationGridProps {
  options: NavigationNode[];
  onSelect: (node: NavigationNode) => void;
}

const NavigationGrid: React.FC<NavigationGridProps> = ({ options, onSelect }) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 pb-12">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className="group relative bg-white rounded-[3rem] p-12 flex flex-col items-center justify-center min-h-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] active:scale-95 transition-all duration-300 border-b-8 border-transparent hover:border-[#d4e11d] overflow-hidden"
        >
          {/* Logo/Imagen del botón */}
          <div className="w-48 h-48 rounded-[2rem] bg-gray-50 flex items-center justify-center mb-8 overflow-hidden shadow-inner border border-gray-100 group-hover:scale-105 transition-transform">
            <img 
              src={option.logo} 
              alt={option.titulo}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/2942/2942001.png';
              }}
            />
          </div>

          <span className="text-4xl font-black text-[#1c6c3e] uppercase text-center leading-tight drop-shadow-sm group-hover:text-[#1c6c3e]/80">
            {option.titulo}
          </span>

          {/* Decoración tipo Badge si es Submenú */}
          {option.tipo === 'submenu' && (
            <div className="absolute top-6 right-6 bg-[#d4e11d] text-[#1c6c3e] font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest shadow-md">
              MÁS INFO
            </div>
          )}

          {/* Efecto de brillo táctil */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      ))}
    </div>
  );
};

export default NavigationGrid;
