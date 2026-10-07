# PSR (Pioneros de la Salsa y Ritmos) - Pagina Web

Proyecto web desarrollado para la academia y academia de baile **PSR (Pioneros de la Salsa y Ritmos)**.

## Descripción del Proyecto

Sitio web estatico multi pagina enfocado en dar a conocer los servicios culturales, clases de baile, eventos, talleres y comercialización de vestuarios artísticos.


## Tecnologías y Recursos

- **HTML5:** Marcado semántico y accesible.
- **CSS3:** Arquitectura modular basada en SMACSS (Base, Layout, Componentes).
- **Librerías externas (libs/):**
  - **Phosphor Icons:** Paquetes tipográficos e iconografía local (*Bold* y *Fill*).
  - **Fuentes Tipográficas Locales:** *Inter* (cuerpo) y *Manrope* (títulos) en formato .woff2.

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
│   main.css                # Manifiesto principal de estilos



js/
    libs/                   # Dependencias y scripts de terceros


docs/                       # Documentación formal de entrega
README.md                   # Ficha técnica y guía de inicio rápido


## Documentación

La documentación complementaria (estándares de codificación, arquitectura y requerimientos) se encuentra disponible en la carpeta:
/docs

## Autor

- **Desarrollador:** Jhan Corena Segura
- **Entorno:** Versión Académica — Universidad