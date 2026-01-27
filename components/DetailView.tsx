import React from "react";
import { NavigationNode } from "../types";

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
        {node.card?.map((card, i) => (
          <div key={card.tipo + i}>
            {card.tipo === "text-h2" && (
              <h2
                className={`text-6xl font-black text-[#1c6c3e] uppercase mb-12 border-b-4 border-[#d4e11d] pb-6 ${i > 0 ? "pt-12" : ""}`}
              >
                {card.titulo}
              </h2>
            )}
            {card.tipo === "text-h3" && (
              <h3 className="text-4xl font-black uppercase text-center p-6">
                {card.titulo}
              </h3>
            )}
            {card.tipo === "text-p" && (
              <p className="text-3xl text-gray-700 leading-relaxed font-medium pb-6">
                {card.titulo}
              </p>
            )}
            {card.tipo === "table-schedules" && (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-6"
              >
                <table className="w-full border-collapse bg-white text-left text-sm">
                  <thead>
                    <tr
                      className={`bg-gradient-to-r from-${card.color ?? "blue"}-600 to-${card.color ?? "blue"}-700 text-white`}
                    >
                      <th className="px-6 py-4 font-bold uppercase tracking-wider">
                        {card.contenido.columnas[0]}
                      </th>
                      <th
                        colSpan="2"
                        className="px-6 py-4 text-center font-bold uppercase tracking-wider"
                      >
                        {card.titulo}
                      </th>
                    </tr>
                    <tr
                      className={`bg-${card.color ?? "blue"}-50 text-${card.color ?? "blue"}-900 border-b border-gray-200`}
                    >
                      <th className="px-6 py-3 font-medium italic text-transparent">
                        {card.contenido.columnas[0]}
                      </th>
                      <th className="px-6 py-3 font-semibold italic border-l border-gray-100">
                        {card.contenido.columnas[1]}
                      </th>
                      <th className="px-6 py-3 font-semibold italic border-l border-gray-100">
                        {card.contenido.columnas[2]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {card.contenido.filas.map((fila, fIndex) => (
                      <tr
                        key={fIndex}
                        className={`transition-colors hover:bg-gray-50 ${fIndex % 2 === 1 ? `bg-${card.color ?? "blue"}-50/40` : ""}`}
                      >
                        <td
                          className={`px-6 py-4 text-gray-900 ${fIndex % 2 === 1 ? "font-bold" : "font-medium"}`}
                        >
                          {fila.fila1}
                        </td>
                        <td
                          className={`px-6 py-4 text-${card.color ?? "blue"}-700 font-medium border-l border-gray-50`}
                        >
                          {fila.fila2}
                        </td>
                        <td
                          className={`px-6 py-4 text-${card.color ?? "blue"}-700 font-medium border-l border-gray-50`}
                        >
                          {fila.fila3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {card.tipo === "table-rates" && (
              <div
                className={`overflow-hidden rounded-xl border-2 border-${card.color ?? "blue"}-900 shadow-xl mb-6`}
              >
                <table className="w-full border-collapse bg-white">
                  <thead>
                    {/* Header Principal */}
                    <tr className={`bg-${card.color ?? "blue"}-900 text-white`}>
                      <th
                        colSpan={card.contenido.columnas.length}
                        className="py-4 px-6 text-center text-xl font-bold tracking-widest uppercase"
                      >
                        {card.titulo}
                      </th>
                    </tr>
                    {/* Sub Header */}
                    <tr className={`bg-${card.color ?? "blue"}-700 text-white`}>
                      {card.contenido.columnas.map((col, i) => (
                        <th
                          key={i}
                          className="py-3 px-6 text-left text-sm font-semibold uppercase border-r border-white/10 last:border-0"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {card.contenido.filas.map((fila, fIndex) => (
                      <tr
                        key={fIndex}
                        className={`transition-colors hover:bg-gray-50 ${fIndex % 2 === 1 ? `bg-${card.color ?? "blue"}-50/40` : ""}`}
                      >
                        <td
                          className={`px-6 py-4 text-gray-900 ${fIndex % 2 === 1 ? "font-bold" : "font-medium"}`}
                        >
                          {fila.fila1}
                        </td>
                        <td
                          className={`px-6 py-4 text-${card.color ?? "blue"}-700 font-medium border-l border-gray-50`}
                        >
                          {fila.fila2}
                        </td>
                        <td
                          className={`px-6 py-4 text-${card.color ?? "blue"}-700 font-medium border-l border-gray-50`}
                        >
                          {fila.fila3}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {card.tipo === "text-p-relaxed" && (
              <p className="text-[0.9em] text-[#666] -mt-4 px-[10px] leading-relaxed pt-6">
                {card.titulo}
              </p>
            )}
          </div>
        ))}

        <div className="mt-20 flex justify-center">
          <button
            onClick={onBack}
            className="bg-[#1c6c3e] text-white text-3xl font-black py-8 px-20 rounded-full shadow-[0_15px_40px_rgba(28,108,62,0.3)] hover:bg-[#1a6138] active:scale-95 transition-all transform flex items-center gap-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="w-10 h-10"
            >
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
