
import { NavigationNode } from './types';
import { IMAGES } from './assets';

export const ZUHEROS_DATA: NavigationNode = {
  id: 'root',
  tipo: 'submenu',
  titulo: 'Inicio',
  logo: 'home',
  opciones: [
    {
      id: 'turismo-cultural',
      tipo: 'submenu',
      titulo: 'Turismo Cultural',
      logo: IMAGES.AYUNTAMIENTO,
      opciones: [
        {
          id: 'monumentos',
          tipo: 'submenu',
          titulo: 'Monumentos',
          logo: 'https://cdn-icons-png.flaticon.com/512/3233/3233383.png',
          opciones: [
            {
              id: 'castillo',
              tipo: 'text',
              titulo: 'Castillo de Zuheros',
              logo: 'https://images.unsplash.com/photo-1590766948512-48175d1c2a01?q=80&w=800',
              imagen: 'https://images.unsplash.com/photo-1590766948512-48175d1c2a01?q=80&w=1200',
              descripcion: 'Espectacular fortaleza roquera de origen árabe (siglo IX) que se funde con la roca caliza. Ofrece las mejores vistas del pueblo y la Subbética. Fue residencia de los Señores de Zuheros y conserva restos de su palacio renacentista.'
            },
            {
              id: 'iglesia',
              tipo: 'text',
              titulo: 'Parroquia de los Remedios',
              logo: 'https://images.unsplash.com/photo-1548625361-195fe0182a70?q=80&w=800',
              imagen: 'https://images.unsplash.com/photo-1548625361-195fe0182a70?q=80&w=1200',
              descripcion: 'Construida sobre una antigua mezquita, destaca por su retablo barroco y la imagen de la Virgen de los Remedios, patrona de la villa. Su torre es un emblema del perfil urbano de Zuheros.'
            }
          ]
        },
        {
          id: 'museos',
          tipo: 'submenu',
          titulo: 'Red de Museos',
          logo: 'https://cdn-icons-png.flaticon.com/512/2990/2990425.png',
          opciones: [
            {
              id: 'museo-arqueologico',
              tipo: 'text',
              titulo: 'Museo Arqueológico',
              logo: 'https://images.unsplash.com/photo-1572953108213-d47293902331?q=80&w=800',
              imagen: 'https://images.unsplash.com/photo-1572953108213-d47293902331?q=80&w=1200',
              descripcion: 'Recoge los hallazgos encontrados en la Cueva de los Murciélagos, desde el Neolítico hasta la época romana. Es fundamental para entender la prehistoria de Andalucía.'
            },
            {
              id: 'museo-costumbres',
              tipo: 'text',
              titulo: 'Museo de Costumbres',
              logo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
              imagen: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200',
              descripcion: 'Ubicado en una casa tradicional, muestra herramientas agrícolas, artesanas y objetos de la vida cotidiana de nuestros antepasados.'
            }
          ]
        }
      ]
    },
    {
      id: 'naturaleza',
      tipo: 'submenu',
      titulo: 'Turismo de Naturaleza',
      logo: IMAGES.ICONO_CASTILLO,
      opciones: [
        {
          id: 'cueva-murcielagos',
          tipo: 'text',
          titulo: 'Cueva de los Murciélagos',
          logo: 'https://images.unsplash.com/photo-1502759683299-cdcc69741a7f?q=80&w=800',
          imagen: 'https://images.unsplash.com/photo-1502759683299-cdcc69741a7f?q=80&w=1200',
          descripcion: 'Monumento Natural de Andalucía. Una de las cuevas más importantes de Europa por sus pinturas rupestres y formaciones geológicas. Se encuentra a 4km del núcleo urbano, en lo más alto de la sierra.'
        },
        {
          id: 'via-verde',
          tipo: 'text',
          titulo: 'Vía Verde del Aceite',
          logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800',
          imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200',
          descripcion: 'Antiguo trazado ferroviario convertido en sendero para ciclistas y caminantes. Atraviesa paisajes infinitos de olivares y ofrece una perspectiva única del Geoparque de las Sierras Subbéticas.'
        }
      ]
    },
    {
      id: 'productos',
      tipo: 'submenu',
      titulo: 'Productos de la Tierra',
      logo: 'https://cdn-icons-png.flaticon.com/512/3081/3081918.png',
      opciones: [
        {
          id: 'quesos',
          tipo: 'text',
          titulo: 'Quesos de Zuheros',
          logo: 'https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=800',
          imagen: 'https://images.unsplash.com/photo-1485962391905-dc37bb36704b?q=80&w=1200',
          descripcion: 'Famosos internacionalmente. Elaborados de forma artesanal con leche de cabra. No te pierdas la Fiesta del Queso en septiembre, donde se reúnen los mejores productores del país.'
        },
        {
          id: 'aceite',
          tipo: 'text',
          titulo: 'Aceite de Oliva D.O. Baena',
          logo: 'https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=800',
          imagen: 'https://images.unsplash.com/photo-1474979266404-7eaacbadcbaf?q=80&w=1200',
          descripcion: 'El "oro líquido" de nuestra tierra. Zuheros pertenece a la prestigiosa Denominación de Origen Baena. Un aceite virgen extra con matices únicos gracias al clima de sierra.'
        }
      ]
    }
  ]
};
