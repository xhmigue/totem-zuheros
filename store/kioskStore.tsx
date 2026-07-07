import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { NavigationNode, CardElement } from "../types"; // Tus interfaces
import PocketBase from "pocketbase";
// Datos iniciales (tu JSON gigante)
import { ZUHEROS_DATA } from "../navigationData";
import Swal from "sweetalert2";
import terminal from "virtual:terminal";
export interface ImageUploderModel {
  tempId: string;
  blob: Blob;
}

interface MediaItem {
  id: string;
  type: "image" | "video";
  name: string;
  url: string;
  position: "left" | "center" | "right";
  duration: number; // 0 para videos significa "reproducir completo"
}
interface ZuherosState {
  selectedNodeId: string;
  setSelectedNodeId: (nodeId: string) => void;
  recordId: string;
  idNodo: string;
  data: NavigationNode;
  imagesUploader: ImageUploderModel[];
  isLoading: boolean;
  isSaving: boolean;
  isPreview: boolean;
  setIsPreview: (isPreview: boolean) => void;
  secondsPreview: number;
  items: MediaItem[];
  setItems: (items: MediaItem[]) => void;
  fetchData: (idNodo: string) => Promise<void>;
  saveData: () => Promise<void>;
  // --- NUEVO ESTADO DE NAVEGACIÓN ---
  currentNodeId: string; // Guardamos el ID en lugar del objeto completo
  historyIds: string[]; // Lista de IDs para el historial
  // ACCIONES DE NAVEGACIÓN
  navigate: (id: string) => void;
  goBack: () => void;
  goHome: () => void;
  // ACCIONES
  // Actualiza cualquier propiedad de un nodo buscando por ID
  updateNode: (id: string, updates: Partial<NavigationNode>) => void;

  // Agrega una nueva opción (hijo) a un nodo específico
  addOptionToNode: (parentId: string, newNode: NavigationNode) => void;
  // Copia una opción (hijo) a un nodo específico
  copyOption: (nodeId: string, index: number) => void;
  // Mueve una opción (hijo) a un nodo específico
  moveOption: (nodeId: string, index: number, direction: "up" | "down") => void;
  // Eliminar un nodo
  deleteNode: (id: string, text: string) => void;

  // Agrega un elemento de card a un nodo de tipo "text"
  addCardToNode: (nodeId: string, newCard: CardElement) => void;

  /* --- MODIFICAR INFORMACION --- */
  moveCard: (
    nodeId: string,
    index: number,
    direction: "up" | "down" | "top" | "bottom",
  ) => void;
  deleteCardFromNode: (nodeId: string, cardIndex: number) => void;
  copyCard: (nodeId: string, cardIndex: number) => void;
  addRowToTable: (nodeId: string, cardIndex: number) => void;
  deleteRowToTable: (nodeId: string, cardIndex: number) => void;
  /* --- AGREGAR IMAGENES --- */
  addImageUploader: (img: ImageUploderModel) => void;
}

export const useZuherosStore = create<ZuherosState>()(
  immer((set, get) => ({
    selectedNodeId: "root",
    setSelectedNodeId: (nodeId: string) => {
      set({ selectedNodeId: nodeId });
      get().navigate(nodeId);
    },
    recordId: "",
    idNodo: "50",
    data: ZUHEROS_DATA, // Estado inicial (Local por defecto)
    imagesUploader: [],
    isLoading: false,
    isSaving: false,
    /* Protector de pantalla */
    isPreview: false,
    setIsPreview: (isPreview: boolean) => set({ isPreview }),
    secondsPreview: 30,
    items: [],
    setItems: (items: MediaItem[]) => set({ items }),

    fetchData: async (idNodo: string) => {
      set({
        isLoading: true,
        idNodo: idNodo || "50",
      });
      try {
        const pb = new PocketBase("https://pruebas.modularbox.com");
        const record = await pb
          .collection("totem")
          .getFirstListItem(`idNodo = ${idNodo}`, {
            fields: `id, data`,
          });

        if (record && record.data) {
          terminal.log(record.id);
          // Si hay internet y datos, actualizamos el estado global
          set({ recordId: record.id, data: record.data as NavigationNode });
        }
      } catch (err) {
        terminal.log("PocketBase offline o error, usando datos locales:", err);
        // No hacemos nada, 'data' ya tiene ZUHEROS_DATA por defecto
      } finally {
        set({ isLoading: false });
      }
    }, // --- AQUÍ ESTÁ TU SAVE DATA TOTALMENTE ADAPTADO ---
    saveData: async () => {
      const { data, imagesUploader, recordId } = get();
      if (!recordId) {
        Swal.fire(
          "Error",
          "No hay un ID de registro activo para guardar.",
          "error",
        );
        return;
      }
      set({ isSaving: true });
      terminal.log(`ImagenesUploader ${imagesUploader.length}`);
      try {
        const pb = new PocketBase("https://pruebas.modularbox.com");
        // Clonamos el JSON de datos actual para actualizar las referencias antes de enviarlo
        const finalData = JSON.parse(JSON.stringify(data));

        // 1. Procesamos las imágenes de la cola una a una en la nueva tabla
        if (imagesUploader.length > 0) {
          for (const img of imagesUploader) {
            try {
              const formData = new FormData();

              // Mandamos el archivo usando el nombre de campo "archive" en inglés
              formData.append("archive", img.blob, `${img.tempId}.png`);

              // Enviamos el archive a PocketBase
              const imgRecord = await pb
                .collection("imagenes_totem")
                .create(formData);

              // Si se sube bien, buscamos el nodo y actualizamos su propiedad con el ID real
              const targetNode = findNodeById(finalData, img.tempId);
              if (targetNode) {
                targetNode.imagen = imgRecord.id;
              }
            } catch (uploadErr: any) {
              // --- CAPTURA DE ERRORES DE POCKETBASE ---
              terminal.log(
                "❌ Fallo detallado al subir la imagen a PocketBase:",
                uploadErr,
              );

              // Si PocketBase responde con datos de error del servidor, los exponemos aquí:
              if (uploadErr.data) {
                terminal.log(
                  "Datos de respuesta del servidor:",
                  uploadErr.data,
                );
              }

              // Lanzamos el error hacia afuera para que frene la ejecución y salte el Swal.fire de error general
              throw new Error(
                `Error en imagen ${img.tempId}: ${uploadErr.message || uploadErr}`,
              );
            }
          }
        }

        // 2. Guardamos el registro del Tótem con el JSON completamente actualizado
        await pb.collection("totem").update(recordId, {
          data: finalData,
        });

        // 3. Sincronizamos el estado local de Zustand con el JSON final y vaciamos la cola
        set({
          data: finalData,
          imagesUploader: [],
        });

        Swal.fire({
          title: "Guardado",
          text: "Todo se a guardado correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        terminal.log("Error al guardar en PocketBase:", err);
        Swal.fire(
          "Error",
          `No se pudieron guardar los cambios, intentalo mas tarde.`,
          "error",
        );
      } finally {
        set({ isSaving: false });
      }
    },

    updateNode: (id, updates) =>
      set((state) => {
        const node = findNodeById(state.data, id);
        if (node) {
          // En lugar de Object.assign, iteramos sobre las llaves para que el Proxy de Immer
          // detecte explícitamente qué propiedad del JSON está mutando (ej: node.imagen = ...)
          Object.keys(updates).forEach((key) => {
            (node as any)[key] = (updates as any)[key];
          });
        }
      }),

    addOptionToNode: (parentId, newNode) =>
      set((state) => {
        const parent = findNodeById(state.data, parentId);
        if (parent) {
          if (!parent.opciones) parent.opciones = [];
          parent.opciones.push(newNode);
        }
      }),

    /* --- MODIFICAR OPCIONES --- */
    moveOption: (nodeId, index, direction) =>
      set((state) => {
        const node = findNodeById(state.data, nodeId);
        if (!node) return;

        const element = node.opciones.splice(index, 1)[0]; // Quitamos el elemento
        if (direction === "up")
          node.opciones.splice(Math.max(0, index - 1), 0, element);
        if (direction === "down")
          node.opciones.splice(
            Math.min(node.opciones.length, index + 1),
            0,
            element,
          );
      }),

    copyOption: (nodeId, index) =>
      set((state) => {
        const node = findNodeById(state.data, nodeId);
        if (!node || !node.opciones) return;
        const option = {
          ...node.opciones[index],
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        };
        // Insertamos la copia en la posición index + 1
        node.opciones.splice(index + 1, 0, {
          ...option,
        });
      }),

    addCardToNode: (nodeId, newCard) =>
      set((state) => {
        const node = findNodeById(state.data, nodeId);
        if (node) {
          if (!node.card) node.card = [];
          node.card.push(newCard);
        }
      }),
    deleteNode: (id, text) =>
      Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar esta ${text}? Esta acción no se puede deshacer.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          set((state) => {
            // Lógica para eliminar un nodo del árbol
            removeNodeById(state.data, id);
          });
        }
      }),
    /* --- NUEVO ESTADO DE NAVEGACIÓN --- */
    currentNodeId: "root", // ID inicial
    historyIds: [],

    // Lógica de navegación
    navigate: (id) =>
      set((state) => {
        state.historyIds.push(state.currentNodeId);
        state.currentNodeId = id;
        state.selectedNodeId = id;
      }),

    goBack: () =>
      set((state) => {
        const prevId = state.historyIds.pop();
        if (prevId) state.currentNodeId = prevId;
      }),

    goHome: () =>
      set((state) => {
        state.currentNodeId = "root"; // O el ID de tu nodo raíz
        state.historyIds = [];
      }),

    /* --- MODIFICAR INFORMACION --- */
    moveCard: (nodeId, index, direction) =>
      set((state) => {
        const node = findNodeById(state.data, nodeId);
        if (!node || !node.card) return;

        const cards = node.card;
        const element = cards.splice(index, 1)[0]; // Quitamos el elemento

        if (direction === "up")
          cards.splice(Math.max(0, index - 1), 0, element);
        if (direction === "down")
          cards.splice(Math.min(cards.length, index + 1), 0, element);
        if (direction === "top") cards.unshift(element);
        if (direction === "bottom") cards.push(element);
      }),

    deleteCardFromNode: (nodeId, cardIndex) =>
      Swal.fire({
        title: "¿Estás seguro?",
        text: `¿Deseas eliminar este contenido? Esta acción no se puede deshacer.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          set((state) => {
            const node = findNodeById(state.data, nodeId);
            if (node && node.card) {
              node.card.splice(cardIndex, 1);
            }
          });
        }
      }),

    copyCard: (nodeId, cardIndex) =>
      set((state) => {
        const node = findNodeById(state.data, nodeId);
        if (!node || !node.card) return;
        const card = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          ...node.card[cardIndex],
        };
        // Insertamos la copia en la posición cardIndex + 1
        node.card.splice(cardIndex + 1, 0, { ...card });
      }),

    addRowToTable: (nodeId, cardIndex) =>
      set((state) => {
        const node = findNodeById(state.data, nodeId);
        if (!node || !node.card) return;
        const card = node.card[cardIndex];
        if (card.tipo.startsWith("table-")) {
          // Agregamos el header
          card.contenido.filas.push({
            fila1: "Fila 1",
            fila2: "Fila 2",
            fila3: "Fila 3",
          });
        }
      }),

    deleteRowToTable: (nodeId, cardIndex) =>
      set((state) => {
        const node = findNodeById(state.data, nodeId);
        if (!node || !node.card) return;
        const card = node.card[cardIndex];
        if (card.tipo.startsWith("table-")) {
          card.contenido.filas.pop();
        }
      }),

    addImageUploader: (img: ImageUploderModel) =>
      set((state) => {
        state.imagesUploader.push(img);
      }),
  })),
);

// --- FUNCIONES HELPER RECURSIVAS (Lógica de Negocio) ---
export function findNodeById(
  root: NavigationNode,
  id: string,
): NavigationNode | null {
  if (root.id === id) return root;
  if (root.opciones) {
    for (const child of root.opciones) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

// --- FUNCIONES HELPER RECURSIVAS (Lógica de Negocio) ---
export function findParentNodeById(
  root: NavigationNode,
  id: string,
): NavigationNode | null {
  if (root.id === id) return root;
  if (root.opciones) {
    for (const child of root.opciones) {
      const found = findParentNodeById(child, id);
      if (found) return root;
    }
  }
  return null;
}

// --- FUNCIONES HELPER RECURSIVAS (Lógica de Negocio) Optener nodo y nombre del padre ---
export function findNodeByIdAndNameParent(
  root: NavigationNode,
  id: string,
  nameParent: string,
): { nameParent: string; node: NavigationNode } | null {
  if (root.id === id) return { nameParent, node: root };
  if (root.opciones) {
    for (const child of root.opciones) {
      const found = findNodeByIdAndNameParent(child, id, root.titulo);
      if (found) return found;
    }
  }
  return null;
}

function removeNodeById(root: NavigationNode, id: string) {
  if (!root.opciones) return;
  const index = root.opciones.findIndex((n) => n.id === id);
  if (index !== -1) {
    root.opciones.splice(index, 1);
    return;
  }
  root.opciones.forEach((child) => removeNodeById(child, id));
}
