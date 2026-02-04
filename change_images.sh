#!/bin/bash

# Directorio donde están las imágenes (por defecto el actual)
DIRECTORIO="assets/images/${1:-.}"

# Ir al directorio
cd "$DIRECTORIO" || exit

# Leer todos los archivos .png
for f in *.JPG; do
  # Comprobar que existen archivos
  [ -e "$f" ] || { echo "No hay imágenes PNG en $DIRECTORIO"; exit 0; }

  # Nombre base del archivo (sin extensión)
  name="${f%.*}"

  echo "Procesando: $f"

  # Redimensionar la imagen a máximo 1024px
  sips -Z 1080 "$f" --out "${name}_temp.png" >/dev/null

  # Convertir a formato .webp con calidad 80
  cwebp -q 80 "${name}_temp.png" -o "${name}.webp" >/dev/null

  # Eliminar la imagen temporal
  rm "${name}_temp.png"
  # Eliminar la imagen temporal
  rm "$f"

  echo "✅ ${name}.webp creado correctamente"
done

echo "🎉 Conversión completada."
