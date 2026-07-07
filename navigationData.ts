import { NavigationNode } from "./types";
import { IMAGES } from "./assets";
/*
DJI_20250401112443_0002_D.webp
DJI_20250401112750_0006_D.webp
DJI_20250401112805_0007_D.webp
DJI_20250401112814_0008_D.webp
DJI_20250401113039_0009_D.webp
DJI_20250401113105_0010_D.webp
DJI_20250401113212_0013_D.webp
DJI_20250401114738_0027_D.webp
DJI_20250401114751_0028_D.webp
DJI_20250401114806_0029_D.webp
DJI_20250401115227_0031_D.webp
DJI_20250401115235_0032_D.webp
DJI_20250401115338_0033_D.webp
DJI_20250401115345_0034_D.webp
DJI_20250401134058_0009_D.webp
DJI_20250401134104_0010_D.webp
DJI_20250401134128_0011_D.webp
DJI_20250401134148_0012_D.webp
DJI_20250401134157_0013_D.webp
DJI_20250401134225_0014_D.webp
DJI_20250401134240_0015_D.webp
DJI_20250401134307_0016_D.webp
DJI_20250401134314_0017_D.webp
DJI_20250401165753_0021_D.webp
DJI_20250401165803_0022_D.webp
DJI_20250401165814_0023_D.webp
DJI_20250401165835_0024_D.webp
DJI_20250401172951_0025_D.webp
DJI_20250401173118_0028_D.webp
DJI_20250401173431_0030_D.webp
DJI_20250401173438_0031_D.webp
DJI_20250401173805_0032_D.webp
DJI_20250401173824_0033_D.webp
DJI_20250401173853_0034_D.webp
DJI_20250401174001_0036_D.webp
*/
export const ZUHEROS_DATA: NavigationNode = {
  id: "root",
  opciones: [
    {
      id: "1774008964277-sny4456",
      imagen: "1774008964277-sny4456.png",
      tipo: "submenu",
      tipoLogo: "image",
      titulo: "Turismo Cultural",
      opciones: [
        {
          card: [
            {
              tipo: "text-h2",
              titulo:
                "La Cueva de los Murciélagos: Un Tesoro Natural e Histórico",
            },
            {
              tipo: "text-p",
              titulo:
                "Situada a 4 kilómetros del término municipal de Zuheros, en la\n              carretera CV 247, esta cavidad es, hasta el momento, la más grande de la provincia de Córdoba,\n              con **3367,9 metros topografiados**. Se encuentra en pleno\n              **Geoparque de las Sierras Subbéticas** a 976,55 metros de altitud sobre el nivel\n              del mar.",
            },
            {
              tipo: "text-h3",
              titulo: "Origen del Nombre",
            },
            {
              tipo: "text-p",
              titulo:
                "Su nombre, **“Cueva de los Murciélagos”**, se debe a la gran cantidad de\n            estos mamíferos que la habitaban. En la actualidad, según el último\n            censo, solo residen unos 200 ejemplares.",
            },
            {
              tipo: "text-h3",
              titulo: "Formación y Significado Prehistórico",
            },
            {
              tipo: "text-p",
              titulo:
                "El constante filtrado de agua desde la superficie, diversas reacciones\n            químicas y el paso de miles de años, son los responsables de crear esta\n            impresionante cavidad con sus numerosas salas y espeleotemas. Este lugar fue,\n            además, elegido por nuestros antepasados durante la Prehistoria para vivir.",
            },
            {
              tipo: "text-h3",
              titulo: "La Experiencia de la Visita Guiada",
            },
            {
              tipo: "text-p",
              titulo:
                "La cueva se visita mediante **visitas guiadas** donde descubrirás no solo las  \n            maravillas geológicas del interior de la tierra, sino también cómo\n            era la forma de vida durante la Prehistoria.",
            },
            {
              tipo: "text-h2",
              titulo: "Información y Reservas",
            },
            {
              tipo: "text-p",
              titulo:
                "Por motivos de conservación y regeneración del microclima de la Cueva, y al ser la visita guiada, el acceso  \n            a la misma se encuentra limitado. Para garantizar su visita es necesario realizar la **reserva CON ANTELACIÓN**.",
            },
            {
              tipo: "text-p",
              titulo:
                "Las reservas se realizan de **miércoles a domingo de 10:00 a 13:30** en\n            el **957694545** o bien a través de nuestro correo electrónico (turismo@zuheros.es).",
            },
            {
              tipo: "text-h3",
              titulo: "Horarios de Pases",
            },
            {
              contenido: {
                columnas: [
                  "Días",
                  "Abril - Septiembre (col2)",
                  "Octubre - Marzo (col3)",
                ],
                filas: [
                  {
                    fila1: "Miércoles a Viernes",
                    fila2: "12:30h · 17:30h",
                    fila3: "12:30h · 16:30h",
                  },
                  {
                    fila1: "Sábados, Domingos y Festivos",
                    fila2: "11:00h · 12:30h · 17:30h",
                    fila3: "11:00h · 12:30h · 16:30h",
                  },
                ],
              },
              tipo: "table-schedules",
              titulo: "Horarios de Pases",
            },
            {
              tipo: "text-h2",
              titulo: "Tarifas",
            },
            {
              color: "red",
              contenido: {
                columnas: [
                  "Tipo de Tarifa",
                  "A partir de 13 años",
                  "De 6 a 12 años",
                ],
                filas: [
                  {
                    fila1: "General",
                    fila2: "8.00 €",
                    fila3: "6.50 €",
                  },
                  {
                    fila1: "Especial *",
                    fila2: "7.00 €",
                    fila3: "6.50 €",
                  },
                  {
                    fila1: "Grupos *",
                    fila2: "6.50 €",
                    fila3: "5.550 €",
                  },
                ],
              },
              tipo: "table-rates",
              titulo: "TARIFAS CUEVA DE LOS MURCIÉLAGOS",
            },
            {
              color: "purple",
              contenido: {
                columnas: [
                  "Tipo de Tarifa",
                  "A partir de 13 años",
                  "De 6 a 12 años",
                ],
                filas: [
                  {
                    fila1: "General",
                    fila2: "11.00 €",
                    fila3: "8.50 €",
                  },
                  {
                    fila1: "Especial *",
                    fila2: "9.50 €",
                    fila3: "8.00 €",
                  },
                  {
                    fila1: "Grupos *",
                    fila2: "9.00 €",
                    fila3: "7.00 €",
                  },
                ],
              },
              tipo: "table-rates",
              titulo: "TARIFAS VISITA CULTURAL",
            },
            {
              tipo: "text-p-relaxed",
              titulo:
                "* Tarifa especial: jubilados, pensionistas, estudiantes,\n                familias numerosas, personas con discapacidad.",
            },
            {
              tipo: "text-p-relaxed",
              titulo: "* Grupos: a partir de 10 personas con reserva previa.",
            },
          ],
          descripcion:
            "Espectacular fortaleza roquera de origen árabe (siglo IX) que se funde con la roca caliza. Ofrece las mejores vistas del pueblo y la Subbética. Fue residencia de los Señores de Zuheros y conserva restos de su palacio renacentista.",
          id: "1774008964281-vgvkrku",
          imagen: "DJI_20250401173118_0028_D.webp",
          tipo: "text",
          tipoLogo: "image",
          titulo: "CUEVA DE LOS MURCIÉLAGOS",
          tituloGeneral: "Turismo Cultural zuheros",
        },
        {
          id: "1774008964281-rjgg0bu",
          imagen: "DJI_20250401173118_0028_D.webp",
          opciones: [
            {
              descripcion:
                "Recoge los hallazgos encontrados en la Cueva de los Murciélagos, desde el Neolítico hasta la época romana. Es fundamental para entender la prehistoria de Andalucía.",
              id: "1774008964281-0903dry",
              imagen:
                "https://images.unsplash.com/photo-1572953108213-d47293902331?q=80&w=1200",
              tipo: "text",
              titulo: "Museo Arqueológico",
            },
            {
              descripcion:
                "Ubicado en una casa tradicional, muestra herramientas agrícolas, artesanas y objetos de la vida cotidiana de nuestros antepasados.",
              id: "1774008964281-i39rfm1",
              imagen:
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
              tipo: "text",
              titulo: "Museo de Costumbres",
            },
          ],
          tipo: "submenu",
          tipoLogo: "image",
          titulo: "ECOMUSEO CUEVA DE LOS MURCIÉLAGOS",
        },
        {
          id: "1774008964281-2hjl7a8",
          imagen: "DJI_20250401173118_0028_D.webp",
          opciones: [],
          tipo: "submenu",
          tipoLogo: "image",
          titulo: "CASTILLO PALACIO",
        },
        {
          id: "1774008964281-8bgzogu",
          imagen: "DJI_20250401173118_0028_D.webp",
          opciones: [],
          tipo: "submenu",
          tipoLogo: "image",
          titulo: "MUSEO ARQUEOLÓGICO",
        },
        {
          id: "1774008964281-naz6vae",
          imagen: "DJI_20250401173118_0028_D.webp",
          opciones: [],
          tipo: "submenu",
          tipoLogo: "image",
          titulo: "MUSEO DE COSTUMBRES Y ARTES POPULARES",
        },
        {
          id: "1774008964281-xv5tki0",
          imagen: "DJI_20250401173118_0028_D.webp",
          opciones: [],
          tipo: "submenu",
          tipoLogo: "image",
          titulo: "OBSERVATORIO",
        },
        {
          id: "1774008964281-d22ix7i",
          imagen: "DJI_20250401173118_0028_D.webp",
          opciones: [],
          tipo: "submenu",
          tipoLogo: "image",
          titulo: "IGLESIA",
        },
        {
          id: "1774008964281-f4t3x1u",
          imagen: "DJI_20250401173118_0028_D.webp",
          opciones: [],
          tipo: "submenu",
          tipoLogo: "image",
          titulo: "MUSEO ESTUDIO DEL PINTOR FRANCISCO POYATO",
        },
      ],
    },
    {
      id: "1774008964281-ppj5kss",
      tipo: "submenu",
      tipoLogo: "image",
      titulo: "Turismo de Naturaleza",
      opciones: [
        {
          descripcion:
            "Monumento Natural de Andalucía. Una de las cuevas más importantes de Europa por sus pinturas rupestres y formaciones geológicas. Se encuentra a 4km del núcleo urbano, en lo más alto de la sierra.",
          id: "1774008964281-crcpk02",
          imagen:
            "https://images.unsplash.com/photo-1502759683299-cdcc69741a7f?q=80&w=1200",
          tipo: "text",
          titulo: "Cueva de los Murciélagos",
        },
        {
          descripcion:
            "Antiguo trazado ferroviario convertido en sendero para ciclistas y caminantes. Atraviesa paisajes infinitos de olivares y ofrece una perspectiva única del Geoparque de las Sierras Subbéticas.",
          id: "1774008964281-47l2kcn",
          imagen:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200",
          tipo: "text",
          titulo: "Vía Verde del Aceite",
        },
      ],
    },
    {
      id: "1774008964281-psadhql",
      tipo: "submenu",
      tipoLogo: "image",
      titulo: "Productos de la Tierra",
      opciones: [
        {
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
          id: "1774008964281-wvj697l",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          tipo: "text",
          titulo: "Quesos de Zuheros",
        },
        {
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
          id: "1774008964281-2coturc",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
        },
      ],
    },
    {
      id: "1774008964281-obc9rzm",
      tipo: "submenu",
      tipoLogo: "image",
      titulo: "FIESTAS TRADICIONALES",
      opciones: [
        {
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
          id: "1774008964281-66loavr",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          tipo: "text",
          titulo: "Quesos de Zuheros",
        },
        {
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
          id: "1774008964281-i15chft",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
        },
      ],
    },
    {
      id: "1774008964281-4gzfnm6",
      imagen: "DJI_20250401173805_0032_D.webp",
      tipo: "submenu",
      tipoLogo: "image",
      titulo: "SERVICIOS",
      opciones: [
        {
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
          id: "1774008964281-hjeyc2n",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          tipo: "text",
          titulo: "Quesos de Zuheros",
        },
        {
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
          id: "1774008964281-h3vrvgs",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
        },
      ],
    },
    {
      id: "1774008964281-j2ypgg9",
      imagen: "DJI_20250401173438_0031_D.webp",
      tipo: "submenu",
      tipoLogo: "image",
      titulo: "AGENDA MENSUAL",
      opciones: [
        {
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
          id: "1774008964281-fzbww17",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          tipo: "text",
          titulo: "Quesos de Zuheros",
        },
        {
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
          id: "1774008964281-1qc1pmk",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
        },
      ],
    },
  ],
  protectordepantalla: {
    descripcion: "Protege tu pantalla contra el daño causado por el sol.",
    duracion: 10,
    id: "protectordepantalla",
    imagen:
      "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
    inactividad: 60,
    protectordepantalla: true,
    seleccionarprotector: "imagen",
    tiempo: 10,
    tipo: "text",
    titulo: "Protector de Pantalla",
    video: "https://www.youtube.com/watch?v=1234567890",
  },
  tipo: "submenu",
  titulo: "Inicio",
};
