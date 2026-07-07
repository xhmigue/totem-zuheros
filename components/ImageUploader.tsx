import React, { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import Swal from "sweetalert2";
import { useZuherosStore } from "../store/kioskStore";
import PocketBase from "pocketbase";
import terminal from "virtual:terminal";
import { NavigationNode } from "@/types";
const pb = new PocketBase("https://pruebas.modularbox.com");

// --- CONFIGURACIÓN DE DIMENSIONES ---
const DIMENSIONES = {
  imagen: { width: 930, height: 453 },
};

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: any,
): Promise<Blob> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const ctx = canvas.getContext("2d");
  ctx?.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
};

export const ImageUploader = ({
  nodeId,
  imageNode,
  handleFieldChange,
}: {
  nodeId: string;
  imageNode?: string;
  handleFieldChange: (
    field: keyof NavigationNode,
    value: any,
    nodeId: string,
  ) => void;
}) => {
  const addImageUploader = useZuherosStore((state) => state.addImageUploader);
  // const updateNode = useZuherosStore((state) => state.updateNode);

  const [image, setImage] = useState<string | null>(null);

  // Guardamos un Blob URL local prioritario para saltarnos PocketBase en la vista previa instantánea
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_: any, slashedPixels: any) => {
    setCroppedAreaPixels(slashedPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage(reader.result as string);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      };
    }
  };

  const handleUpload = async () => {
    try {
      if (!image || !croppedAreaPixels) return;
      const blob = await getCroppedImg(image, croppedAreaPixels);

      // 1. Creamos el objeto de URL local binario
      const blobUrl = URL.createObjectURL(blob);

      // 2. Lo guardamos en el estado local del uploader para usarlo inmediatamente
      setLocalPreviewUrl(blobUrl);

      // 3. Pasamos el blobUrl al store para que viaje de forma síncrona
      handleFieldChange("imagen", blobUrl, nodeId);

      // 4. Agregamos a la cola para PocketBase
      addImageUploader({
        tempId: nodeId,
        blob,
      });

      setImage(null); // Cierra el modal

      Swal.fire({
        icon: "success",
        title: "¡Recorte preparado!",
        text: "Recuerda pulsar Guardar para subir los cambios.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo procesar el recorte", "error");
    }
  };

  return (
    <div className="w-full">
      <label className="text-sm font-semibold text-slate-500 uppercase">
        ({DIMENSIONES.imagen.width}x{DIMENSIONES.imagen.height})px
      </label>

      <input
        type="file"
        id={`image-upload-${nodeId}`}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* BOTÓN DE DISPARO CON PREVIEW ESTRATÉGICO */}
      <button
        type="button"
        onClick={() =>
          document.getElementById(`image-upload-${nodeId}`)?.click()
        }
        className="relative h-48 w-full border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden group hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center"
      >
        {/* PRIORIDAD 1: Si hay recorte local reciente, muéstralo sin consultar red */}
        {localPreviewUrl ? (
          <img
            src={localPreviewUrl}
            className="w-full h-full object-contain p-4"
            alt="Local preview"
          />
        ) : imageNode ? (
          imageNode.startsWith("blob") ? (
            <img
              src={imageNode}
              className="w-full h-full object-contain p-4"
              alt="Totem"
            />
          ) : (
            /* PRIORIDAD 2: Si no hay recorte local, que TotemImage resuelva el ID de PocketBase o URL antigua */
            <TotemImage
              imageId={imageNode}
              className="w-full h-full object-contain p-4"
            />
          )
        ) : (
          /* FALLBACK: Icono por defecto */
          <div className="flex flex-col items-center text-slate-400">
            <span className="text-3xl">🖼️</span>
            <span>Subir Imagen</span>
          </div>
        )}
      </button>

      {/* MODAL / POPUP FLOTANTE (ESTILO INTERFAZ PROFESIONAL) */}
      {image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl transform transition-all border border-slate-100">
            {/* Cabecera */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h4 className="font-bold text-slate-800 uppercase tracking-tight text-sm">
                Ajustar Posición y Área de Recorte
              </h4>
              <button
                onClick={() => setImage(null)}
                className="text-slate-400 hover:text-red-500 text-3xl font-light transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Zona de Corte Flotante */}
            <div className="relative h-96 w-full bg-slate-950">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={DIMENSIONES.imagen.width / DIMENSIONES.imagen.height}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                minZoom={0.5}
                maxZoom={3}
                restrictPosition={false}
              />
            </div>

            {/* Controles del Modal */}
            <div className="p-6 bg-white">
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">
                  <span>Zoom del visor</span>
                  <span className="text-blue-600">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  value={zoom}
                  min={0.5}
                  max={3}
                  step={0.01}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleUpload}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                >
                  Confirmar y Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
interface OptionImageProps {
  imagenNode?: string;
  idNodo: string; // Pasamos el idNodo desde el store si es necesario para el fallback local
  className?: string;
  altText?: string;
}

export const OptionImage = ({
  imagenNode,
  idNodo,
  className,
  altText = "Option preview",
}: OptionImageProps) => {
  const [resolvedUrl, setResolvedUrl] = useState<string>("");
  console.log(imagenNode);
  useEffect(() => {
    const resolveImage = async () => {
      if (!imagenNode) {
        setResolvedUrl("");
        return;
      }
      if (imagenNode.startsWith("blob")) {
        setResolvedUrl(imagenNode);
        return;
      }
      // 1. Salvaguarda por si todavía tiene los strings antiguos de assets locales o URLs directas
      if (
        imagenNode.startsWith("https") ||
        imagenNode.endsWith(".png") ||
        imagenNode.endsWith(".webp")
      ) {
        const url = imagenNode.startsWith("https")
          ? imagenNode
          : `assets/images/${idNodo}/${imagenNode}`;
        setResolvedUrl(url);
      } else {
        // 2. Es un ID de PocketBase (colección imagenes_totem)
        try {
          const record = await pb
            .collection("imagenes_totem")
            .getOne(imagenNode);
          const url = pb.files.getURL(record, record.archive);
          setResolvedUrl(url);
          return;
        } catch (error) {
          console.error(
            "Error obteniendo la imagen de opción desde PocketBase:",
            error,
          );
        }
      }
      setResolvedUrl("");
    };

    resolveImage();
  }, [imagenNode, idNodo]);

  if (!resolvedUrl) {
    // Retorna un marcador de posición (placeholder) o null mientras carga o si no hay imagen
    return (
      <div
        className={`${className} flex items-center justify-center bg-slate-100 text-slate-400`}
      ></div>
    );
  }

  return (
    <img src={resolvedUrl} alt={`${altText}dsakjhsios`} className={className} />
  );
};

interface TotemImageProps {
  imageId: string;
  className?: string;
}

export const TotemImage: React.FC<TotemImageProps> = ({
  imageId,
  className,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  console.log("imageId", imageId);
  useEffect(() => {
    if (!imageId) {
      setLoading(false);
      return;
    }

    if (imageId.startsWith("blob")) {
      setImageUrl(imageId);
      return;
    }
    // Si ya es una URL local o externa antigua
    if (
      imageId.startsWith("http") ||
      imageId.endsWith(".png") ||
      imageId.endsWith(".webp")
    ) {
      setImageUrl(imageId);
      setLoading(false);
      return;
    }

    // Si es un ID de PocketBase, lo resolvemos de forma asíncrona aislada
    const fetchImage = async () => {
      try {
        const pb = new PocketBase("https://pruebas.modularbox.com");
        const record = await pb.collection("imagenes_totem").getOne(imageId);
        const url = pb.files.getURL(record, record.archive);
        setImageUrl(url);
      } catch (error) {
        console.error("Error obteniendo la imagen de PocketBase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageId]);

  if (loading)
    return <div className={`${className} bg-gray-200 animate-pulse`} />; // Loader temporal
  if (!imageUrl) return <div className={`${className} bg-gray-300`} />; // Fallback si no hay foto

  return <img src={imageUrl} className={className} alt="Totem" />;
};
