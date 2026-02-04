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
  tipo: "submenu",
  titulo: "Inicio",
  logo: "home",
  opciones: [
    {
      id: "turismo-cultural",
      tipo: "submenu",
      titulo: "Turismo Cultural",
      logo: "DJI_20250401112443_0002_D.webp",
      tipoLogo: "image",
      opciones: [
        {
          id: "cueva-de-los-murcielagos",
          tipo: "text",
          titulo: "CUEVA DE LOS MURCIÉLAGOS",
          tituloGeneral: "Turismo Cultural",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          descripcion:
            "Espectacular fortaleza roquera de origen árabe (siglo IX) que se funde con la roca caliza. Ofrece las mejores vistas del pueblo y la Subbética. Fue residencia de los Señores de Zuheros y conserva restos de su palacio renacentista.",
          card: [
            {
              tipo: "text-h2",
              titulo:
                "La Cueva de los Murciélagos: Un Tesoro Natural e Histórico",
            },
            {
              tipo: "text-p",
              titulo: `Situada a 4 kilómetros del término municipal de Zuheros, en la
              carretera CV 247, esta cavidad es, hasta el momento, la más grande de la provincia de Córdoba,
              con **3367,9 metros topografiados**. Se encuentra en pleno
              **Geoparque de las Sierras Subbéticas** a 976,55 metros de altitud sobre el nivel
              del mar.`,
            },
            {
              tipo: "text-h3",
              titulo: "Origen del Nombre",
            },
            {
              tipo: "text-p",
              titulo: `Su nombre, **“Cueva de los Murciélagos”**, se debe a la gran cantidad de
            estos mamíferos que la habitaban. En la actualidad, según el último
            censo, solo residen unos 200 ejemplares.`,
            },
            {
              tipo: "text-h3",
              titulo: "Formación y Significado Prehistórico",
            },
            {
              tipo: "text-p",
              titulo: `El constante filtrado de agua desde la superficie, diversas reacciones
            químicas y el paso de miles de años, son los responsables de crear esta
            impresionante cavidad con sus numerosas salas y espeleotemas. Este lugar fue,
            además, elegido por nuestros antepasados durante la Prehistoria para vivir.`,
            },
            {
              tipo: "text-h3",
              titulo: "La Experiencia de la Visita Guiada",
            },
            {
              tipo: "text-p",
              titulo: `La cueva se visita mediante **visitas guiadas** donde descubrirás no solo las  
            maravillas geológicas del interior de la tierra, sino también cómo
            era la forma de vida durante la Prehistoria.`,
            },
            {
              tipo: "text-h2",
              titulo: "Información y Reservas",
            },
            {
              tipo: "text-p",
              titulo: `Por motivos de conservación y regeneración del microclima de la Cueva, y al ser la visita guiada, el acceso  
            a la misma se encuentra limitado. Para garantizar su visita es necesario realizar la **reserva CON ANTELACIÓN**.`,
            },
            {
              tipo: "text-p",
              titulo: `Las reservas se realizan de **miércoles a domingo de 10:00 a 13:30** en
            el **957694545** o bien a través de nuestro correo electrónico (turismo@zuheros.es).`,
            },
            {
              tipo: "text-h3",
              titulo: "Horarios de Pases",
            },
            {
              tipo: "table-schedules",
              titulo: "Horarios de Pases",
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
            },
            {
              tipo: "text-h2",
              titulo: "Tarifas",
            },
            {
              tipo: "table-rates",
              titulo: "TARIFAS CUEVA DE LOS MURCIÉLAGOS",
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
            },
            {
              tipo: "table-rates",
              titulo: "TARIFAS VISITA CULTURAL",
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
            },
            {
              tipo: "text-p-relaxed",
              titulo: `* Tarifa especial: jubilados, pensionistas, estudiantes,
                familias numerosas, personas con discapacidad.`,
            },
            {
              tipo: "text-p-relaxed",
              titulo: `* Grupos: a partir de 10 personas con reserva previa.`,
            },
          ],
        },
        {
          id: "ecomuseo-cueva-de-los-murcielagos",
          tipo: "submenu",
          titulo: "ECOMUSEO CUEVA DE LOS MURCIÉLAGOS",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          opciones: [
            {
              id: "museo-arqueologico",
              tipo: "text",
              titulo: "Museo Arqueológico",
              logo: "https://images.unsplash.com/photo-1572953108213-d47293902331?q=80&w=800",
              imagen:
                "https://images.unsplash.com/photo-1572953108213-d47293902331?q=80&w=1200",
              descripcion:
                "Recoge los hallazgos encontrados en la Cueva de los Murciélagos, desde el Neolítico hasta la época romana. Es fundamental para entender la prehistoria de Andalucía.",
            },
            {
              id: "museo-costumbres",
              tipo: "text",
              titulo: "Museo de Costumbres",
              logo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
              imagen:
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200",
              descripcion:
                "Ubicado en una casa tradicional, muestra herramientas agrícolas, artesanas y objetos de la vida cotidiana de nuestros antepasados.",
            },
          ],
        },
        {
          id: "castillo-palacio",
          tipo: "submenu",
          titulo: "CASTILLO PALACIO",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          opciones: [],
        },
        {
          id: "museo-arqueologico",
          tipo: "submenu",
          titulo: "MUSEO ARQUEOLÓGICO",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          opciones: [],
        },
        {
          id: "museo-costumbres-y-artes-populares",
          tipo: "submenu",
          titulo: "MUSEO DE COSTUMBRES Y ARTES POPULARES",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          opciones: [],
        },
        {
          id: "observatorio",
          tipo: "submenu",
          titulo: "OBSERVATORIO",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          opciones: [],
        },
        {
          id: "iglesia",
          tipo: "submenu",
          titulo: "IGLESIA",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          opciones: [],
        },
        {
          id: "museo-estudio-del-pintor-francisco-poyato",
          tipo: "submenu",
          titulo: "MUSEO ESTUDIO DEL PINTOR FRANCISCO POYATO",
          logo: "DJI_20250401173118_0028_D.webp",
          tipoLogo: "image",
          opciones: [],
        },
      ],
    },
    {
      id: "naturaleza",
      tipo: "submenu",
      titulo: "Turismo de Naturaleza",
      logo: "DJI_20250401112750_0006_D.webp",
      tipoLogo: "image",
      opciones: [
        {
          id: "cueva-murcielagos",
          tipo: "text",
          titulo: "Cueva de los Murciélagos",
          logo: "https://images.unsplash.com/photo-1502759683299-cdcc69741a7f?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1502759683299-cdcc69741a7f?q=80&w=1200",
          descripcion:
            "Monumento Natural de Andalucía. Una de las cuevas más importantes de Europa por sus pinturas rupestres y formaciones geológicas. Se encuentra a 4km del núcleo urbano, en lo más alto de la sierra.",
        },
        {
          id: "via-verde",
          tipo: "text",
          titulo: "Vía Verde del Aceite",
          logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200",
          descripcion:
            "Antiguo trazado ferroviario convertido en sendero para ciclistas y caminantes. Atraviesa paisajes infinitos de olivares y ofrece una perspectiva única del Geoparque de las Sierras Subbéticas.",
        },
      ],
    },
    {
      id: "productos",
      tipo: "submenu",
      titulo: "Productos de la Tierra",
      logo: "DJI_20250401114738_0027_D.webp",
      tipoLogo: "image",
      opciones: [
        {
          id: "quesos",
          tipo: "text",
          titulo: "Quesos de Zuheros",
          logo: "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
        },
        {
          id: "aceite",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
          logo: "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
        },
      ],
    },
    {
      id: "fiestas-tradicionales",
      tipo: "submenu",
      titulo: "FIESTAS TRADICIONALES",
      logo: "DJI_20250401173118_0028_D.webp",
      tipoLogo: "image",
      opciones: [
        {
          id: "quesos",
          tipo: "text",
          titulo: "Quesos de Zuheros",
          logo: "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
        },
        {
          id: "aceite",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
          logo: "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
        },
      ],
    },
    {
      id: "servicios",
      tipo: "submenu",
      titulo: "SERVICIOS",
      logo: "DJI_20250401173805_0032_D.webp",
      tipoLogo: "image",
      opciones: [
        {
          id: "quesos",
          tipo: "text",
          titulo: "Quesos de Zuheros",
          logo: "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
        },
        {
          id: "aceite",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
          logo: "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
        },
      ],
    },
    {
      id: "agenda-mensual",
      tipo: "submenu",
      titulo: "AGENDA MENSUAL",
      logo: "DJI_20250401173438_0031_D.webp",
      tipoLogo: "image",
      opciones: [
        {
          id: "quesos",
          tipo: "text",
          titulo: "Quesos de Zuheros",
          logo: "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
          descripcion:
            "Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.",
        },
        {
          id: "aceite",
          tipo: "text",
          titulo: "Aceite de Oliva D.O. Baena",
          logo: "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=800",
          imagen:
            "https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200",
          descripcion:
            'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.',
        },
      ],
    },
  ],
  protectordepantalla: {
    id: "protectordepantalla",
    tipo: "text",
    titulo: "Protector de Pantalla",
    logo: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png",
    imagen:
      "https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200",
    video: "https://www.youtube.com/watch?v=1234567890",
    protectordepantalla: true,
    duracion: 10,
    inactividad: 60,
    tiempo: 10,
    seleccionarprotector: "imagen",
    descripcion: "Protege tu pantalla contra el daño causado por el sol.",
  },
};
