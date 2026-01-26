
import React from 'react';
import { NavigationNode } from '../types';

interface DetailViewProps {
  node: NavigationNode;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ node, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700">
      {/* Imagen de Cabecera */}
      {node.imagen && (
        <div className="relative h-[450px] w-full">
          <img 
            src={node.imagen} 
            alt={node.titulo} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <h2 className="absolute bottom-10 left-12 text-6xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
            {node.titulo}
          </h2>
        </div>
      )}

      <div className="p-16">
        {!node.imagen && (
          <h2 className="text-6xl font-black text-[#1c6c3e] uppercase mb-12 border-b-4 border-[#d4e11d] pb-6">
            {node.titulo}
          </h2>
        )}

        <div className="space-y-10">
          <p className="text-3xl text-gray-700 leading-relaxed font-medium">
            {node.descripcion}
          </p>

          <div className="bg-[#f1f5f9] p-10 rounded-[2rem] border-l-[12px] border-[#1c6c3e] shadow-inner">
            <h4 className="text-[#1c6c3e] font-black text-2xl uppercase mb-4">Recomendación Zuheros</h4>
            <p className="text-xl text-gray-600 italic">
              "Para disfrutar al máximo de {node.titulo}, recomendamos visitarlo a primera hora de la mañana para apreciar la luz única de la Sierra Subbética."
            </p>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <button 
            onClick={onBack}
            className="bg-[#1c6c3e] text-white text-3xl font-black py-8 px-20 rounded-full shadow-[0_15px_40px_rgba(28,108,62,0.3)] hover:bg-[#1a6138] active:scale-95 transition-all transform flex items-center gap-6"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-10 h-10">
              <path d="M19 12H5m0 0l7-7m-7 7l7 7" />
            </svg>
            VOLVER AL MENÚ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
