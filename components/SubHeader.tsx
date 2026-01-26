
import React from 'react';

interface SubHeaderProps {
  onBack: () => void;
  onHome: () => void;
  isHome: boolean;
}

const SubHeader: React.FC<SubHeaderProps> = ({ onBack, onHome, isHome }) => {
  return (
    <div className="bg-white border-b-4 border-gray-100 px-6 py-4 flex justify-between items-center relative">
      {/* Volver Button */}
      <button 
        onClick={onBack}
        disabled={isHome}
        className={`flex flex-col items-center transition-all ${isHome ? 'opacity-20 cursor-default' : 'active:scale-95'}`}
      >
        <div className="bg-[#1c6c3e] p-3 rounded-full shadow-lg">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </div>
        <span className="text-[#1c6c3e] font-bold text-sm mt-1 uppercase">Volver</span>
      </button>

      {/* Centered Title */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-[#1c6c3e] text-5xl font-black tracking-widest uppercase">
          {isHome ? 'Inicio' : 'Detalle'}
        </h2>
      </div>

      {/* Inicio Button */}
      <button 
        onClick={onHome}
        className="flex flex-col items-center active:scale-95 transition-transform"
      >
        <div className="bg-[#1c6c3e] p-3 rounded-full shadow-lg">
          <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
        <span className="text-[#1c6c3e] font-bold text-sm mt-1 uppercase">Inicio</span>
      </button>
    </div>
  );
};

export default SubHeader;
