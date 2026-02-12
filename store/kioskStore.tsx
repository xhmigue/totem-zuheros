import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { NavigationNode, CardElement } from "../types"; // Tus interfaces
import PocketBase from "pocketbase";
export interface ImageUploderModel {
  tempId: string;
  blob: Blob;
}

interface ZuherosState {
  idNodo: string;
  data: NavigationNode;
  imagesUploader: ImageUploderModel[];
  isLoading: boolean;
  isSaving: boolean;
  fetchData: () => Promise<void>;
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

// Datos iniciales (tu JSON gigante)
import { ZUHEROS_DATA } from "../navigationData";
import Swal from "sweetalert2";
import { uploadx } from "@/utils/utils";

export const useZuherosStore = create<ZuherosState>()(
  immer((set, get) => ({
    idNodo: "50",
    data: ZUHEROS_DATA, // Estado inicial (Local por defecto)
    imagesUploader: [],
    isLoading: false,
    isSaving: false,

    fetchData: async () => {
      set({ isLoading: true });
      try {
        const pb = new PocketBase("https://pruebas.modularbox.com");
        const record = await pb.collection("totem").getOne("yo93kp2mw48a2d9", {
          fields: `id, data`,
        });

        if (record && record.data) {
          // Si hay internet y datos, actualizamos el estado global
          set({ data: record.data as NavigationNode });
        }
      } catch (err) {
        console.error("PocketBase offline o error, usando datos locales:", err);
        // No hacemos nada, 'data' ya tiene ZUHEROS_DATA por defecto
      } finally {
        set({ isLoading: false });
      }
    },
    saveData: async () => {
      const { data, imagesUploader, idNodo } = get(); // Obtenemos la data actual del store
      set({ isSaving: true });

      try {
        /* Subir imagenes */
        const formData = new FormData();
        formData.append("idNodo", idNodo);
        formData.append(
          "items",
          JSON.stringify(imagesUploader.map(({ tempId }) => ({ tempId }))),
        );
        for (const img of imagesUploader) {
          // IMPORTANTE: La key debe coincidir con el tempId para identificarla en PHP
          formData.append("file_" + img.tempId, img.blob, img.tempId);
        }
        const response = await uploadx(
          "upload-panel/save-image-totem",
          formData,
        );
        if (response === null) return;
        set({ imagesUploader: [] });
        const pb = new PocketBase("https://pruebas.modularbox.com");

        // El ID es el que ya tenías en tu fetchData
        const recordId = "yo93kp2mw48a2d9";

        // Actualizamos PocketBase enviando el objeto data completo
        await pb.collection("totem").update(recordId, {
          data: data, // Asegúrate de que el campo en PocketBase se llame 'data' (tipo JSON)
        });

        Swal.fire({
          title: "¡Publicado!",
          text: "Los cambios se han guardado en el servidor correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Error al guardar en PocketBase:", err);
        Swal.fire(
          "Error",
          "No se pudieron guardar los cambios: " + err,
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
          Object.assign(node, updates);
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
        const option = node.opciones[index];
        // Insertamos la copia en la posición index + 1
        node.opciones.splice(index + 1, 0, { ...option });
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
        const card = node.card[cardIndex];
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
