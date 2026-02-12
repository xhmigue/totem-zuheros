import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Swal from "sweetalert2";
import { useZuherosStore } from "../store/kioskStore";

// --- CONFIGURACIÓN DE DIMENSIONES ---
// Aquí es donde defines el tamaño final de salida de tus imágenes
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

  // 1. AQUÍ SE CAMBIAN LAS DIMENSIONES DEL CANVAS (EL RESULTADO FINAL)
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
  userId,
  imageNode,
}: {
  userId: string;
  imageNode?: string;
}) => {
  const idNodo = useZuherosStore((state) => state.idNodo);
  const addImageUploader = useZuherosStore((state) => state.addImageUploader);
  const updateNode = useZuherosStore((state) => state.updateNode);
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // ESTADOS PARA EL MOVIMIENTO (Posicionamiento libre)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_: any, slashedPixels: any) => {
    setCroppedAreaPixels(slashedPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage(reader.result as string);
        setCrop({ x: 0, y: 0 }); // Resetear posición al cargar
        setZoom(1);
      };
    }
  };

  const handleUpload = async () => {
    try {
      if (!image || !croppedAreaPixels) return;
      const blob = await getCroppedImg(image, croppedAreaPixels);
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
      updateNode(userId, { imagen: `${userId}.png` });
      addImageUploader({
        tempId: userId,
        blob,
      });
      setImage(null);
      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo procesar", "error");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-bold mb-6 text-slate-800 tracking-tight">
        Identidad Visual
      </h3>

      {/* BOTÓN Image CON PREVIEW */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-500 uppercase">
          Imagen ({DIMENSIONES.imagen.width}x{DIMENSIONES.imagen.height})
        </label>
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e)}
        />
        <button
          onClick={() => document.getElementById("image-upload")?.click()}
          className="relative h-48 w-full border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden group hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          {imageNode ? (
            <img
              src={imageUrl ? imageUrl : `assets/images/${idNodo}/${imageNode}`}
              alt="Preview"
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <span className="text-3xl">🖼️</span>
              <span>Subir Imagen</span>
            </div>
          )}
        </button>
      </div>

      {/* MODAL DE RECORTE */}
      {image && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b flex justify-between items-center">
              <h4 className="font-bold text-slate-800 uppercase tracking-tight">
                Ajustar Posición
              </h4>
              <button
                onClick={() => setImage(null)}
                className="text-slate-400 hover:text-red-500 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="relative h-80 w-full bg-slate-800">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                // 2. AQUÍ SE CAMBIA LA PROPORCIÓN DEL RECUADRO DE CORTE
                aspect={DIMENSIONES.imagen.width / DIMENSIONES.imagen.height}
                onCropChange={setCrop} // Esto permite que muevas la imagen con el mouse
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                minZoom={0.5} // Permite alejar la imagen
                maxZoom={3} // Permite acercar la imagen
                restrictPosition={false} // Si quieres mover la imagen incluso fuera de los bordes, cámbialo a false
              />
            </div>

            <div className="p-8 bg-white">
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase">
                  Zoom: {Math.round(zoom * 100)}%
                </label>
                <input
                  type="range"
                  value={zoom}
                  min={0.5}
                  max={3}
                  step={0.01}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setImage(null)}
                  className="flex-1 px-6 py-3 border border-slate-200 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200"
                >
                  Guardar Recorte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
