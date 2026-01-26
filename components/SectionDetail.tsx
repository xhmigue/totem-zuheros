
import React, { useState, useEffect } from 'react';
import { MenuSection } from '../types';
import { GoogleGenAI } from '@google/genai';

interface SectionDetailProps {
  section: MenuSection;
  onBack: () => void;
}

const SectionDetail: React.FC<SectionDetailProps> = ({ section, onBack }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Actúa como un guía turístico experto de Zuheros (Córdoba, España). 
        Proporciona información detallada, atractiva y profesional sobre el tema: "${section}".
        Usa un tono acogedor. Estructura la respuesta con párrafos claros y puntos clave.
        Máximo 200 palabras.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        setContent(response.text || 'No se pudo cargar la información en este momento.');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Lo sentimos, ha ocurrido un error al conectar con el servidor de información.');
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [section]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 mt-4 border border-gray-100">
      <div className="flex items-center gap-6 mb-8 pb-4 border-b">
        <div className="bg-[#1c6c3e] text-white p-4 rounded-2xl">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
             <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
             <circle cx="12" cy="10" r="3" />
           </svg>
        </div>
        <h2 className="text-4xl font-black text-[#1c6c3e] uppercase">{section}</h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1c6c3e]"></div>
          <p className="text-[#1c6c3e] font-bold text-xl animate-pulse">Cargando información actualizada...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 text-xl font-bold">{error}</p>
          <button 
            onClick={onBack}
            className="mt-6 bg-[#1c6c3e] text-white px-8 py-3 rounded-full font-bold shadow-lg"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {content.split('\n').map((para, i) => (
            <p key={i} className="mb-4 text-xl">
              {para}
            </p>
          ))}
          
          <div className="mt-12 grid grid-cols-2 gap-4">
            <img src={`https://picsum.photos/seed/${section}-1/400/250`} alt="Zuheros 1" className="rounded-2xl shadow-md border-4 border-white" />
            <img src={`https://picsum.photos/seed/${section}-2/400/250`} alt="Zuheros 2" className="rounded-2xl shadow-md border-4 border-white" />
          </div>

          <div className="mt-10 flex justify-center">
             <button 
               onClick={onBack}
               className="bg-[#1c6c3e] hover:bg-[#1a6138] text-white text-2xl font-bold py-6 px-16 rounded-full shadow-xl transform transition-all active:scale-95"
             >
               CERRAR Y VOLVER AL MENÚ
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionDetail;
