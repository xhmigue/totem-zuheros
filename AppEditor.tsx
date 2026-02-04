import React, { useState, useEffect } from "react";
import { ZUHEROS_DATA } from "./navigationData";
import { NavigationNode, CardElement } from "./types";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  Image as ImageIcon,
  FileText,
  FolderTree,
} from "lucide-react";

export const AppEditor = () => {
  const [data, setData] = useState<NavigationNode>(ZUHEROS_DATA);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("root");

  // Función para encontrar y actualizar un nodo recursivamente
  const updateNode = (
    nodes: NavigationNode,
    id: string,
    newData: Partial<NavigationNode>,
  ): NavigationNode => {
    if (nodes.id === id) return { ...nodes, ...newData };
    if (nodes.opciones) {
      return {
        ...nodes,
        opciones: nodes.opciones.map((node) => updateNode(node, id, newData)),
      };
    }
    return nodes;
  };

  const handleFieldChange = (field: keyof NavigationNode, value: any) => {
    const updated = updateNode(data, selectedNodeId, { [field]: value });
    setData({ ...updated });
  };

  // Nodo seleccionado actualmente para el formulario
  const findNode = (
    node: NavigationNode,
    id: string,
  ): NavigationNode | null => {
    if (node.id === id) return node;
    if (node.opciones) {
      for (let child of node.opciones) {
        const found = findNode(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeNode = findNode(data, selectedNodeId);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* SIDEBAR: Estructura de Árbol */}
      <aside className="w-1/4 border-r bg-white overflow-y-auto p-4">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FolderTree size={20} /> Estructura
        </h2>
        <TreeItem
          node={data}
          onSelect={setSelectedNodeId}
          selectedId={selectedNodeId}
        />
        <ProtectorDePantalla
          node={data.protectordepantalla}
          onSelect={setSelectedNodeId}
          selectedId={selectedNodeId}
        />
      </aside>

      {/* MAIN: Formulario de Edición */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeNode ? (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
            <header className="mb-6 border-b pb-4">
              <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">
                Editando: {activeNode.tipo}
              </span>
              <h1 className="text-2xl font-bold">{activeNode.titulo}</h1>
            </header>

            <div className="space-y-6">
              {/* Inputs Básicos */}
              <FormField
                label="ID del Nodo (URL)"
                value={activeNode.id}
                disabled
              />
              <FormField
                label="Título del Menú"
                value={activeNode.titulo}
                onChange={(e) => handleFieldChange("titulo", e.target.value)}
              />

              {activeNode.tipo === "text" && (
                <>
                  <FormField
                    label="Título General (H1)"
                    value={activeNode.tituloGeneral || ""}
                    onChange={(e) =>
                      handleFieldChange("tituloGeneral", e.target.value)
                    }
                  />
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descripción Corta
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md h-24 mb-4"
                    value={activeNode.descripcion}
                    onChange={(e) =>
                      handleFieldChange("descripcion", e.target.value)
                    }
                  />
                  <FormField
                    label="URL de Imagen Principal"
                    value={activeNode.imagen || ""}
                    onChange={(e) =>
                      handleFieldChange("imagen", e.target.value)
                    }
                  />
                </>
              )}

              {/* Editor de Cards si es tipo text */}
              {activeNode.tipo === "text" && (
                <div className="mt-8">
                  <h3 className="font-bold border-t pt-4 mb-4">
                    Bloques de Contenido (Cards)
                  </h3>
                  <CardBuilder
                    cards={activeNode.card || []}
                    onChange={(newCards) => handleFieldChange("card", newCards)}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            Selecciona un elemento para editar
          </div>
        )}
      </main>

      {/* PREVIEW: JSON Resultante */}
      <aside className="w-1/4 border-l bg-slate-900 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-mono text-sm">JSON Output</h2>
          <button
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            }
            className="text-xs bg-slate-700 text-white px-2 py-1 rounded hover:bg-slate-600"
          >
            Copiar
          </button>
        </div>
        <pre className="text-[10px] text-green-400 font-mono">
          {JSON.stringify(data, null, 2)}
        </pre>
      </aside>
    </div>
  );
};

// Componente de Campo de Formulario Reutilizable
const FormField = ({ label, value, onChange, disabled = false }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      disabled={disabled}
      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50"
      value={value}
      onChange={onChange}
    />
  </div>
);

const TreeItem = ({ node, onSelect, selectedId }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedId === node.id;

  return (
    <div className="ml-2">
      <div
        onClick={() => onSelect(node.id)}
        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
          isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100"
        }`}
      >
        {node.tipo === "submenu" ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <FileText size={16} className="text-slate-400" />
        )}
        <span className="text-sm font-medium truncate">{node.titulo}</span>
      </div>

      {isOpen && node.opciones && (
        <div className="ml-4 border-l pl-2 mt-1">
          {node.opciones.map((child: any) => (
            <TreeItem
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
          <button className="flex items-center gap-1 text-xs text-blue-500 mt-2 p-1 hover:bg-blue-50 rounded">
            <Plus size={12} /> Añadir opción
          </button>
        </div>
      )}
    </div>
  );
};

const ProtectorDePantalla = ({ node, onSelect, selectedId }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedId === node.id;

  return (
    <div className="ml-2">
      <div
        onClick={() => onSelect(node.id)}
        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
          isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100"
        }`}
      >
        {node.tipo === "submenu" ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <FileText size={16} className="text-slate-400" />
        )}
        <span className="text-sm font-medium truncate">{node.titulo}</span>
      </div>

      {isOpen && node.opciones && (
        <div className="ml-4 border-l pl-2 mt-1">
          {node.opciones.map((child: any) => (
            <TreeItem
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
          <button className="flex items-center gap-1 text-xs text-blue-500 mt-2 p-1 hover:bg-blue-50 rounded">
            <Plus size={12} /> Añadir opción
          </button>
        </div>
      )}
    </div>
  );
};
const COLORS = [
  "blue",
  "green",
  "red",
  "yellow",
  "white",
  "black",
  "gray",
  "orange",
  "purple",
];
const CardBuilder = ({
  cards,
  onChange,
}: {
  cards: CardElement[];
  onChange: (c: CardElement[]) => void;
}) => {
  const updateCard = (index: number, fields: Partial<CardElement>) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], ...fields };
    onChange(newCards);
  };

  // Función genérica para añadir bloques
  const addBlock = (tipo: CardElement["tipo"]) => {
    const baseCard: any = { tipo, titulo: "" };

    // Si es tabla, inicializamos la estructura de contenido
    if (tipo === "table-rates" || tipo === "table-schedules") {
      baseCard.titulo =
        tipo === "table-rates" ? "Nuevas Tarifas" : "Nuevos Horarios";
      baseCard.color = "blue";
      baseCard.contenido = {
        columnas: ["Categoría", "Precio A", "Precio B"],
        filas: [{ fila1: "", fila2: "", fila3: "" }],
      };
    } else {
      baseCard.titulo = "Escribe aquí tu texto...";
    }

    onChange([...cards, baseCard]);
  };

  return (
    <div className="space-y-6">
      {/* --- LISTADO DE CARDS ACTUALES --- */}
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-4 border-2 border-slate-100 rounded-xl bg-white shadow-sm relative group animate-in fade-in slide-in-from-top-2"
        >
          {/* Botón Eliminar */}
          <button
            onClick={() => onChange(cards.filter((_, i) => i !== idx))}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <Trash2 size={14} />
          </button>

          {/* Badge de Tipo */}
          <div className="mb-2">
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                card.tipo.startsWith("table")
                  ? "bg-amber-100 text-amber-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {card.tipo.replace("text-", "").replace("table-", "Tabla ")}
            </span>
          </div>

          {/* Campo de Texto / Título (Aplica a TODOS) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase">
              {card.tipo.startsWith("text-p")
                ? "Contenido del párrafo"
                : "Texto del encabezado"}
            </label>
            <textarea
              className={`w-full p-2 border-none bg-slate-50 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none ${
                card.tipo === "text-h2" ? "text-lg font-bold" : "text-sm"
              }`}
              rows={card.tipo.startsWith("text-p") ? 3 : 1}
              value={card.titulo}
              onChange={(e) => updateCard(idx, { titulo: e.target.value })}
            />
          </div>

          {/* --- EDITOR EXTRA PARA TABLAS --- */}
          {(card.tipo === "table-schedules" || card.tipo === "table-rates") && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
              {/* Selector de Color con Círculos */}
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-2 uppercase">
                  Color Visual
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => updateCard(idx, { color: c as any })}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${card.color === c ? "scale-125 border-slate-900 ring-2 ring-slate-200" : "border-transparent"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Editor de Celdas */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {card.contenido?.columnas.map((col, cIdx) => (
                    <input
                      key={cIdx}
                      className="text-[10px] p-1.5 border rounded bg-slate-100 font-bold text-center"
                      value={col}
                      onChange={(e) => {
                        const newCols = [...(card.contenido?.columnas || [])];
                        newCols[cIdx] = e.target.value;
                        updateCard(idx, {
                          contenido: { ...card.contenido!, columnas: newCols },
                        });
                      }}
                    />
                  ))}
                </div>

                {card.contenido?.filas.map((fila, fIdx) => (
                  <div key={fIdx} className="grid grid-cols-3 gap-2">
                    {(["fila1", "fila2", "fila3"] as const).map((fKey) => (
                      <input
                        key={fKey}
                        placeholder="Dato..."
                        className="text-[11px] p-1.5 border rounded focus:bg-white"
                        value={fila[fKey]}
                        onChange={(e) => {
                          const newFilas = [...card.contenido!.filas];
                          newFilas[fIdx][fKey] = e.target.value;
                          updateCard(idx, {
                            contenido: { ...card.contenido!, filas: newFilas },
                          });
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* --- TOOLBAR PARA AÑADIR NUEVOS BLOQUES --- */}
      <div className="bg-slate-100 p-4 rounded-xl border-2 border-dashed border-slate-200">
        <p className="text-xs font-bold text-slate-500 mb-3 uppercase text-center">
          Añadir nuevo bloque de contenido
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => addBlock("text-h2")}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-orange-50 hover:border-orange-200 transition-colors"
          >
            <Plus size={14} className="text-blue-500" /> Encabezado Grande
          </button>
          <button
            onClick={() => addBlock("text-h3")}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <Plus size={14} className="text-blue-500" /> Encabezado Pequeño
          </button>
          <button
            onClick={() => addBlock("text-p")}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <Plus size={14} className="text-blue-500" /> Párrafo
          </button>
          <button
            onClick={() => addBlock("text-p-relaxed")}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <Plus size={14} className="text-blue-500" /> Párrafo Relaxed
          </button>
        </div>
        {/* Fila de Tablas */}
        <div className="flex flex-wrap justify-center gap-2 pt-6">
          <button
            onClick={() => addBlock("table-schedules")}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-orange-50 hover:border-orange-200 transition-colors"
          >
            <Plus size={14} className="text-orange-500" /> Tabla Horarios
          </button>
          <button
            onClick={() => addBlock("table-rates")}
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-purple-50 hover:border-purple-200 transition-colors"
          >
            <Plus size={14} className="text-purple-500" /> Tabla Tarifas
          </button>
        </div>
      </div>

      <style jsx>{`
        .btn-add {
          @apply px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-bold hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm;
        }
      `}</style>
    </div>
  );
};
