# PSR (Pioneros de la Salsa y Ritmos) - Pagina Web

Proyecto web desarrollado para la academia y academia de baile **PSR (Pioneros de la Salsa y Ritmos)**.

## Descripción del Proyecto

Sitio web estatico multi pagina enfocado en dar a conocer los servicios culturales, clases de baile, eventos, talleres y comercialización de vestuarios artísticos.


## Tecnologías y Recursos

- **HTML5:** Marcado semántico y accesible.
- **CSS3:** Arquitectura modular basada en SMACSS (Base, Layout, Componentes).
- **JavaScript (ES6+):** Manipulación del DOM, gestión de eventos, peticiones asíncronas (`fetch` con `async / await`) y persistencia local (`localStorage`).
- **Recursos externos y librerías:**
  - **Bootstrap 5:** Sistema de grilla responsive y componentes interactivos.
  - **Phosphor Icons y Google Fonts:** Iconografía vectorial (*Bold* y *Fill*) y tipografías (*Inter* y *Manrope*).

## Estructura del Proyecto

PSR-WEB-UNIVERSIDAD/
index.html                  # Página principal (Inicio)

pages/                          # Secciones y subpáginas del portal
│   ├── academia.html           # Formación y niveles de baile
│   ├── rumba-aerobica.html     # Clases fitness y bienestar
│   ├── personalizadas.html     # Clases y preparación individualizada
│   ├── contratar.html          # Cotización de shows y espectáculos
│   ├── talleres.html           # Cursos intensivos y workshops
│   ├── vestuarios.html         # Catálogo y alquiler de vestuario
│   ├── nosotros.html           # Trayectoria, equipo y filosofía
│   ├── contacto.html           # Información y formulario de contacto
│   ├── blog.html               # Centro de noticias y artículos│
│   ├── blog-anuncios.html      # Publicación: Anuncios
│   ├── blog-clases.html        # Publicación: Clases
│   ├── blog-comunidad.html     # Publicación: Comunidad
│   └── blog-presentaciones.html# Publicación: Presentaciones



css/
│   base/                   # Variables CSS, reset y estilos globales
│   layout/                 # Cabecera, navegación y pie de página compartidos
│   components/             # Botones, tarjetas, formularios, acordeones
│   libs/                   # Dependencias de terceros (iconos, fuentes)
│   │   fonts/              # Inter y Manrope locales (.woff2)
│   │   phosphor-icons/     # Iconografía vectorial local
│   styles.css              # Manifiesto principal de estilos



img/                        # Fotografías de la academia
│   icons/                  # Iconos de redes sociales (.svg)
│   logo-psr-pestaña.png    # Logo que se muestra en la pestaña del navegador



js/
├── libs/               # Dependencias de terceros (Bootstrap bundle)
├── almacenamiento.js   # Persistencia en localStorage (JSON)
├── cliente-http.js     # Cliente HTTP global (fetch, async/await, estados 200/404/500)
├── formularios.js      # Eventos y envío asíncrono de formularios
├── interactividad.js   # Calculadora de tarifas, filtros y consumo de API
└── main.js             # Inicializador principal


docs/                       # Documentación formal de entrega
README.md                   # Ficha técnica y guía de inicio rápido


## Documentación

La documentación complementaria (estándares de codificación, arquitectura y requerimientos) se encuentra disponible en la carpeta:
/docs

## Autor

- **Desarrollador:** Jhan Corena Segura
- **Entorno:** Versión Académica — Universidad