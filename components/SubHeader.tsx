
import React from 'react';

interface SubHeaderProps {
  onBack: () => void;
  onHome: () => void;
  isHome: boolean;
  title: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ onBack, onHome, isHome, title }) => {
  return (
    <div className="bg-white border-b-4 border-gray-100 px-10 py-6 flex justify-between items-center relative shadow-sm">
      {/* Botón Volver */}
      <button 
        onClick={onBack}
        disabled={isHome}
        className={`flex items-center gap-3 transition-all ${isHome ? 'opacity-0 pointer-events-none' : 'active:scale-90'}`}
      >
        <div className="bg-[#1c6c3e] p-4 rounded-2xl shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </div>
        <span className="text-[#1c6c3e] font-black text-xl uppercase tracking-widest">Atrás</span>
      </button>

      {/* Título Dinámico Centrado */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-[60%]">
        <h2 className="text-[#1c6c3e] text-4xl font-black tracking-tighter uppercase truncate drop-shadow-sm">
          {isHome ? 'Seleccione una Categoría' : title}
        </h2>
      </div>

      {/* Botón Inicio */}
      <button 
        onClick={onHome}
        className={`flex items-center gap-3 transition-all ${isHome ? 'opacity-20 grayscale pointer-events-none' : 'active:scale-90'}`}
      >
        <span className="text-[#1c6c3e] font-black text-xl uppercase tracking-widest text-right">Inicio</span>
        <div className="bg-[#1c6c3e] p-4 rounded-2xl shadow-lg">
          <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default SubHeader;
