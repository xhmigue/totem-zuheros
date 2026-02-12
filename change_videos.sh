#!/bin/bash

# Configuración de calidad
# crf 23 es un estándar de alta calidad (rango 0-63, menor es más calidad)
# bitrate 0 permite que el crf controle la calidad
DIRECTORIO="assets/videos/${1:-.}"
# Ir al directorio
cd "$DIRECTORIO" || exit
#!/bin/bash

# Bajamos el CRF a 28 (un poco menos de calidad, mucho más ligero)
# Usamos el preset "faster" para que no sea un archivo ultra complejo de leer
CRF="28"

for f in *.MP4; do
  [ -e "$f" ] || continue
  name="${f%.*}"
  echo "✂️ Recortando y optimizando para Tótem: $f"

  # EXPLICACIÓN DEL FILTRO CROP:
  # crop=ancho:alto:x:y 
  # 2160:3840: (in_w-2160)/2 : (in_h-3840)/2 -> Corta al centro exacto
  
  ffmpeg -i "$f" \
    -vf "crop=2160:2160:(in_w-2160)/2:(in_h-2160)/2" \
    -c:v libx264 \
    -profile:v main \
    -level:v 5.1 \
    -crf $CRF \
    -preset faster \
    -tune stillimage \
    -pix_fmt yuv420p \
    -an \
    "${name}_Talle_Vertical.mp4"

  echo "✅ Archivo optimizado: ${name}_Talle_Vertical.mp4"
done
# Bajamos el CRF a 28 (un poco menos de calidad, mucho más ligero)
# Usamos el preset "faster" para que no sea un archivo ultra complejo de leer
# CRF="28"

# for f in *.MP4; do
#   [ -e "$f" ] || continue
#   name="${f%.*}"
#   echo "🚀 Procesando con aceleración de hardware: $f"

#   # 1. Rotamos el video si es necesario y ajustamos a 2160x3840
#   # 2. Usamos h264_videotoolbox (Super rápido en Mac)
#   # 3. Bitrate de 15M (Alta calidad pero fluido para tótems)

#   ffmpeg -i "$f" \
#     -vf "transpose=1,scale=2160:3840" \
#     -c:v h264_videotoolbox \
#     -b:v 15M \
#     -profile:v high \
#     -an \
#     "${name}_vertical.mp4"

#   echo "✅ ¡Listo! Archivo: ${name}_vertical.mp4"
# done