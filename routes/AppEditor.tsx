import React, { useState, useEffect } from "react";
// import { ZUHEROS_DATA } from "../navigationData";
import { useZuherosStore } from "../store/kioskStore";
import { NavigationNode, CardElement } from "../types";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  FileText,
  FolderTree,
  ChevronUp,
  ChevronsUp,
  ChevronsDown,
  LayoutGrid,
  Minus,
  Copy,
} from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { AppPreview } from "./AppPreview";
import CarouselEditor from "@/components/CarouselEditor";
const ISJSONEDITOR = false;
export const AppEditor = () => {
  // 1. TODOS los hooks de Zustand primero
  const data = useZuherosStore((state) => state.data);
  const saveData = useZuherosStore((state) => state.saveData);
  const isLoading = useZuherosStore((state) => state.isLoading);
  const fetchData = useZuherosStore((state) => state.fetchData);
  const addOptionToNode = useZuherosStore((state) => state.addOptionToNode);
  const copyOption = useZuherosStore((state) => state.copyOption);
  const moveOption = useZuherosStore((state) => state.moveOption);
  const deleteNode = useZuherosStore((state) => state.deleteNode);

  // 2. El hook de estado local TAMBIÉN debe ir aquí arriba
  const [selectedNodeId, setSelectedNodeId] = useState<string>("root");

  // 3. useEffect también aquí
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 4. AHORA SÍ, después de todos los hooks, puedes poner el IF
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Cargando datos desde PocketBase...</span>
      </div>
    );
  }

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
    useZuherosStore.setState({ data: updated });
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
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FolderTree size={20} /> Estructura
          </h2>
          <button
            onClick={() => saveData()}
            className="bg-blue-600 text-white py-1 px-4 mb-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Guardar
          </button>
        </div>
        <TreeItem
          node={data}
          index={0}
          onSelect={setSelectedNodeId}
          selectedId={selectedNodeId}
          isSubSubMenu={false}
          isInit={true}
          addOptionToNode={addOptionToNode}
          copyOption={copyOption}
          moveOption={moveOption}
          deleteNode={deleteNode}
          parentId={data.id}
          length={0}
        />
        <ScreenProjector
          node={data.protectordepantalla}
          onSelect={setSelectedNodeId}
          selectedId={selectedNodeId}
        />
      </aside>

      {/* MAIN: Formulario de Edición */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeNode && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
            <header className="mb-6 border-b pb-4">
              <span className="text-xs font-bold uppercase text-blue-600 tracking-wider block">
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
              <SelectField
                label="Tipo de Logo"
                value={"image"}
                options={[
                  { value: "image", label: "Imagen" },
                  { value: "video", label: "Video" },
                ]}
                onChange={(e) => handleFieldChange("tipoLogo", e.target.value)}
              />
              <ImageUploader
                userId={activeNode.id}
                imageNode={activeNode.imagen}
              />
              {/* Editor de Cards si es tipo text */}
              {activeNode.tipo === "text" && (
                <div className="mt-8">
                  <h3 className="font-bold border-t pt-4 mb-4">
                    Bloques de Contenido (Cards)
                  </h3>
                  <CardBuilder
                    nodeId={activeNode.id}
                    cards={activeNode.card || []}
                    onChange={(newCards) => handleFieldChange("card", newCards)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {selectedNodeId === "screen-projector" && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
            <header className="mb-6 border-b pb-4">
              <span className="text-xs font-bold uppercase text-blue-600 tracking-wider block">
                Editando: Projector de Pantalla
              </span>
              <h1 className="text-2xl font-bold">Projector de Pantalla</h1>
            </header>
            <div className="space-y-6">
              {/* Inputs Básicos */}
              <FormField
                label="ID del Nodo (URL)"
                value={"screen-projector"}
                disabled
              />
              <FormField
                label="Título del Menú"
                value="Projector de Pantalla"
                onChange={(e) => handleFieldChange("titulo", e.target.value)}
              />
              <CarouselEditor />
            </div>
          </div>
        )}
      </main>
      {/* PREVIEW: JSON Resultante */}
      {ISJSONEDITOR ? (
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
      ) : (
        <AppPreview widthOverride="w-[700px]" zoom={0.23} />
      )}
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

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
}

const SelectField = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Selecciona una opción",
}: SelectFieldProps) => (
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <select
        disabled={disabled}
        value={value}
        onChange={onChange}
        className="w-full p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50 appearance-none bg-white text-slate-900 cursor-pointer disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Icono de flecha personalizado para consistencia */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default SelectField;
interface TreeItemProps {
  key?: string;
  index: number;
  node: NavigationNode;
  onSelect: (id: string) => void;
  selectedId: string;
  isSubSubMenu: boolean;
  isInit: boolean;
  addOptionToNode: (parentId: string, newNode: NavigationNode) => void;
  copyOption: (nodeId: string, index: number) => void;
  moveOption: (nodeId: string, index: number, direction: "up" | "down") => void;
  deleteNode: (id: string, text: string) => void;
  parentId: string;
  length: number;
}
const TreeItem = ({
  index,
  node,
  onSelect,
  selectedId,
  isSubSubMenu,
  isInit,
  addOptionToNode,
  copyOption,
  moveOption,
  deleteNode,
  parentId,
  length,
}: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedId === node.id;
  const hoverButtons = isSelected ? "hover:bg-gray-100" : "hover:bg-blue-100";
  return (
    <div className="ml-2">
      <div
        onClick={() => onSelect(node.id)}
        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
          isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-slate-100"
        }`}
      >
        <div className="flex items-center justify-between">
          {node.tipo === "submenu" ? (
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          ) : (
            <FileText size={16} className="text-slate-400" />
          )}
          {!isInit && (
            <>
              <button
                onClick={() =>
                  deleteNode(node.id, isSubSubMenu ? "información" : "opción")
                }
                className="p-1 rounded hover:bg-red-100 text-red-600"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => moveOption(parentId, index, "up")}
                className={`p-1 rounded ${hoverButtons} text-blue-600 transition-colors`}
                title="Mover arriba"
              >
                <ChevronUp size={16} />
              </button>

              <button
                onClick={() => moveOption(parentId, index, "down")}
                className={`p-1 rounded ${hoverButtons} text-blue-600 transition-colors`}
                title="Mover abajo"
              >
                <ChevronDown size={16} />
              </button>
              {length < 8 && (
                <button
                  onClick={() => copyOption(parentId, index)}
                  className={`p-1 rounded ${hoverButtons} text-blue-600 transition-colors`}
                  title="Copiar elemento"
                >
                  <Copy size={16} />
                </button>
              )}
            </>
          )}
        </div>
        <span className="text-sm font-medium truncate">{node.titulo}</span>
      </div>

      {isOpen && node.opciones && (
        <div className="ml-4 border-l pl-2 mt-1">
          {node.opciones.map((child: any, idx: number) => (
            <TreeItem
              key={child.id}
              node={child}
              index={idx}
              onSelect={onSelect}
              selectedId={selectedId}
              isSubSubMenu={true}
              isInit={false}
              addOptionToNode={addOptionToNode}
              copyOption={copyOption}
              moveOption={moveOption}
              deleteNode={deleteNode}
              parentId={node.id}
              length={node.opciones.length}
            />
          ))}
          {/* Botón para añadir opción en el menu principal izquierdo */}
          {node.opciones.length < 8 && (
            <button
              className="flex items-center gap-1 text-xs text-blue-500 mt-2 p-1 hover:bg-blue-50 rounded"
              onClick={() =>
                isSubSubMenu
                  ? addOptionToNode(node.id, {
                      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                      tipo: "text",
                      titulo: "Nueva Opción",
                      descripcion: "",
                      tipoLogo: "image",
                      logo: "",
                    })
                  : addOptionToNode(node.id, {
                      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                      tipo: "submenu",
                      titulo: "Nueva Opción",
                      descripcion: "",
                      tipoLogo: "image",
                      logo: "",
                      opciones: [],
                    })
              }
            >
              <Plus size={12} />{" "}
              {isSubSubMenu ? "Añadir información" : "Añadir opción"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ScreenProjector = ({ node, onSelect, selectedId }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedId === "screen-projector";

  return (
    <div className="ml-2">
      <div
        onClick={() => onSelect("screen-projector")}
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
        <span className="text-sm font-medium truncate">{node.titulo} dsss</span>
      </div>
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
  nodeId,
}: {
  cards: CardElement[];
  onChange: (c: CardElement[]) => void;
  nodeId: string;
}) => {
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
      <DetailCard cards={cards} onChange={onChange} nodeId={nodeId} />

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

// ... (Tus interfaces CardElement y COLORS deben estar definidas arriba)
const DetailCard: React.FC<{
  cards: CardElement[];
  onChange: (c: CardElement[]) => void;
  nodeId: string;
}> = ({ cards, onChange, nodeId }) => {
  const moveCard = useZuherosStore((state) => state.moveCard);
  const copyCard = useZuherosStore((state) => state.copyCard);
  const addRow = useZuherosStore((state) => state.addRowToTable);
  const deleteRow = useZuherosStore((state) => state.deleteRowToTable);
  const deleteCard = useZuherosStore((state) => state.deleteCardFromNode);

  const updateCard = (index: number, fields: Partial<CardElement>) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], ...fields };
    onChange(newCards);
  };

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      {cards.map((card, idx) => (
        <div
          key={card.tipo + idx}
          className="group flex flex-row items-stretch w-full gap-4 transition-all"
        >
          {/* PANEL DE CONTROL IZQUIERDO (Estilo Toolbar Pro) */}
          <div className="flex flex-col gap-2 p-2 bg-slate-50/50 border border-slate-200 rounded-xl self-start sticky top-4 shadow-sm">
            {/* Grupo de Movimiento */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveCard(nodeId, idx, "top")}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white bg-transparent border border-transparent hover:border-blue-200 rounded-lg transition-all shadow-none hover:shadow-sm"
                title="Mover al inicio"
              >
                <ChevronsUp size={16} />
              </button>
              <button
                onClick={() => moveCard(nodeId, idx, "up")}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-white bg-transparent border border-slate-200 hover:border-slate-300 rounded-lg transition-all shadow-sm"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => moveCard(nodeId, idx, "down")}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-white bg-transparent border border-slate-200 hover:border-slate-300 rounded-lg transition-all shadow-sm"
              >
                <ChevronDown size={16} />
              </button>
              <button
                onClick={() => moveCard(nodeId, idx, "bottom")}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white bg-transparent border border-transparent hover:border-blue-200 rounded-lg transition-all shadow-none hover:shadow-sm"
                title="Mover al final"
              >
                <ChevronsDown size={16} />
              </button>
              <button
                onClick={() => copyCard(nodeId, idx)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-white bg-transparent border border-slate-200 hover:border-slate-300 rounded-lg transition-all shadow-sm"
                title="Copiar elemento"
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="h-[1px] bg-slate-200 mx-1 my-1" />

            {/* Grupo de Acciones */}
            <div className="flex flex-col gap-1">
              {card.tipo.includes("table") && (
                <button
                  onClick={() => addRow(nodeId, idx)}
                  className="p-2 text-emerald-600 hover:bg-emerald-50 bg-white border border-emerald-100 rounded-lg transition-all shadow-sm"
                  title="Añadir Fila"
                >
                  <Plus size={16} />
                </button>
              )}
              {card.tipo.includes("table") && (
                <button
                  onClick={() => deleteRow(nodeId, idx)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 bg-white border border-red-100 rounded-lg transition-all shadow-sm"
                  title="Eliminar Fila"
                >
                  <Minus size={16} />
                </button>
              )}

              <button
                onClick={() => deleteCard(nodeId, idx)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 bg-white border border-red-100 rounded-lg transition-all shadow-sm"
                title="Eliminar elemento"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* CONTENIDO DE LA CARD (Ahora expandido) */}
          <div className="flex-1 p-6 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow relative">
            {/* Badge de Tipo */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LayoutGrid size={14} className="text-slate-400" />
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    card.tipo.startsWith("table")
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {card.tipo.replace("text-", "").replace("table-", "Tabla ")}
                </span>
              </div>
            </div>

            {/* Campo de Texto / Título */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                {card.tipo.startsWith("text-p")
                  ? "Contenido del párrafo"
                  : "Encabezado"}
              </label>
              <textarea
                className={`w-full p-3 bg-slate-50 border border-transparent focus:border-blue-200 focus:bg-white rounded-lg transition-all outline-none resize-none ${
                  card.tipo === "text-h2"
                    ? "text-xl font-semibold text-slate-800"
                    : "text-sm text-slate-600"
                }`}
                rows={card.tipo.startsWith("text-p") ? 4 : 1}
                value={card.titulo}
                onChange={(e) => updateCard(idx, { titulo: e.target.value })}
                placeholder="Escribe aquí..."
              />
            </div>

            {/* --- EDITOR EXTRA PARA TABLAS --- */}
            {(card.tipo === "table-schedules" ||
              card.tipo === "table-rates") && (
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-6">
                {/* Selector de Color */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-3 uppercase">
                    Color de acento
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => updateCard(idx, { color: c as any })}
                        className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${
                          card.color === c
                            ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                            : ""
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Editor de Celdas estilo Spreadsheet */}
                <div className="overflow-hidden border border-slate-100 rounded-lg">
                  <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-100">
                    {card.contenido?.columnas.map((col, cIdx) => (
                      <input
                        key={cIdx}
                        className="bg-transparent text-[11px] p-2 text-center font-bold text-slate-600 focus:bg-white outline-none border-r border-slate-100 last:border-r-0"
                        value={col}
                        onChange={(e) => {
                          const newCols = [...(card.contenido?.columnas || [])];
                          newCols[cIdx] = e.target.value;
                          updateCard(idx, {
                            contenido: {
                              ...card.contenido!,
                              columnas: newCols,
                            },
                          });
                        }}
                      />
                    ))}
                  </div>

                  {card.contenido?.filas.map((fila, fIdx) => (
                    <div
                      key={fIdx}
                      className="grid grid-cols-3 border-b border-slate-100 last:border-b-0"
                    >
                      {(["fila1", "fila2", "fila3"] as const).map((fKey) => (
                        <input
                          key={fKey}
                          className="text-[11px] p-2 text-center text-slate-500 focus:bg-blue-50 outline-none border-r border-slate-100 last:border-r-0 transition-colors"
                          value={fila[fKey]}
                          onChange={(e) => {
                            const newFilas = [...card.contenido!.filas];
                            newFilas[fIdx][fKey] = e.target.value;
                            updateCard(idx, {
                              contenido: {
                                ...card.contenido!,
                                filas: newFilas,
                              },
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
        </div>
      ))}
    </div>
  );
};
