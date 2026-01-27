import { NavigationNode } from "./types";
import { IMAGES } from "./assets";

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
      logo: IMAGES.AYUNTAMIENTO,
      opciones: [
        {
          id: "cueva-de-los-murcielagos",
          tipo: "text",
          titulo: "Turismo Cultural",
          tituloGeneral: "CUEVA DE LOS MURCIÉLAGOS",
          logo: "https://www.flaticon.com/free-animated-icon/target_6172513?related_id=6172513",
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
          logo: "https://cdn-icons-gif.flaticon.com/6172/6172512.gif",
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
          logo: "https://cdn-icons-png.flaticon.com/512/2990/2990425.png",
          opciones: [],
        },
        {
          id: "museo-arqueologico",
          tipo: "submenu",
          titulo: "MUSEO ARQUEOLÓGICO",
          logo: "https://cdn-icons-png.flaticon.com/512/2990/2990425.png",
          opciones: [],
        },
        {
          id: "museo-costumbres-y-artes-populares",
          tipo: "submenu",
          titulo: "MUSEO DE COSTUMBRES Y ARTES POPULARES",
          logo: "https://cdn-icons-png.flaticon.com/512/2990/2990425.png",
          opciones: [],
        },
        {
          id: "observatorio",
          tipo: "submenu",
          titulo: "OBSERVATORIO",
          logo: "https://cdn-icons-png.flaticon.com/512/2990/2990425.png",
          opciones: [],
        },
        {
          id: "iglesia",
          tipo: "submenu",
          titulo: "IGLESIA",
          logo: "https://cdn-icons-png.flaticon.com/512/2990/2990425.png",
          opciones: [],
        },
        {
          id: "museo-estudio-del-pintor-francisco-poyato",
          tipo: "submenu",
          titulo: "MUSEO ESTUDIO DEL PINTOR FRANCISCO POYATO",
          logo: "https://cdn-icons-png.flaticon.com/512/2990/2990425.png",
          opciones: [],
        },
      ],
    },
    {
      id: "naturaleza",
      tipo: "submenu",
      titulo: "Turismo de Naturaleza",
      logo: IMAGES.ICONO_CASTILLO,
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
      logo: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png",
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
      logo: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png",
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
      logo: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png",
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
      logo: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png",
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
      id: "link-subbeticacordobesa",
      tipo: "submenu",
      titulo: "Link Subbética Cordobesa",
      logo: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png",
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
      id: "foto-postal",
      tipo: "submenu",
      titulo: "Foto Postal",
      logo: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png",
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
};
