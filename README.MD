# PSR (Pioneros de la Salsa y Ritmos) - Aplicación Web SPA

Aplicación web de página única (SPA) desarrollada con **Vue 3**, **Vue Router** y **Vite** para la escuela de baile **PSR (Pioneros de la Salsa y Ritmos)** en Sincelejo.

## Descripción del Proyecto

Portal web enfocado en presentar los programas de formación en danza, clases de rumba aeróbica, clases personalizadas, cotización de shows, talleres para instituciones, catálogo interactivo de vestuarios, blog comunitario y gestión reactiva de solicitudes.

## Tecnologías y Recursos

- **Vue 3 (Single File Components - `.vue`):** Arquitectura basada en componentes reutilizables (`props` y eventos personalizados `$emit`), directivas reactivas (`v-model`, `v-for`, `v-if / v-else`, `v-bind`, `v-on`) y estado global compartido (`reactive`).
- **Vue Router 4:** Navegación SPA sin recarga de página con 11 rutas (incluyendo ruta dinámica `/blog/:slug` para el detalle de publicaciones).
- **Vite:** Empaquetador y servidor de desarrollo rápido.
- **HTML5 y CSS3:** Marcado semántico accesible, arquitectura CSS modular (CSS Grid en layout principal, Flexbox en componentes y 3 breakpoints responsive).
- **Fetch API y `localStorage`:** Consumo asíncrono (`async / await`) de la API pública de días festivos de Colombia (`date.nager.at`), envío HTTP `POST` con manejo de estados (`200/201`, `404`, `500`) y persistencia de borradores e historial de solicitudes en `localStorage`.
- **Bootstrap 5, Phosphor Icons y Google Fonts:** Grilla responsive, acordeones, menú móvil e iconografía.

## Arquitectura de Carpetas

```text
PSR-WEB-UNIVERSIDAD/
├── index.html                  # Punto de entrada HTML de la SPA
├── package.json                # Dependencias y scripts (dev, build, preview)
├── vite.config.js              # Configuración de Vite y plugin de Vue
├── public/
│   ├── img/                    # Fotografías de la academia e íconos SVG
│   ├── js/                     # Bootstrap bundle local
│   └── _redirects              # Regla de redirección SPA para despliegue
├── css/
│   ├── base/                   # Variables CSS y estilos globales (CSS Grid)
│   ├── layout/                 # Estilos de cabecera, navegación y pie de página
│   ├── components/             # Botones, tarjetas, formularios, acordeones
│   ├── libs/                   # Bootstrap CSS y recursos de respaldo
│   └── styles.css              # Archivo principal de estilos
├── src/
│   ├── main.js                 # Inicialización de Vue y Vue Router
│   ├── App.vue                 # Componente raíz (Header + RouterView + Footer)
│   ├── components/             # Componentes reutilizables (.vue)
│   │   ├── PsrHeader.vue       # Barra de navegación SPA
│   │   ├── PsrFooter.vue       # Pie de página y botón flotante
│   │   ├── PsrPageHero.vue     # Portada reutilizable para vistas internas
│   │   ├── PsrCard.vue         # Tarjeta reutilizable con props y $emit('seleccionar')
│   │   ├── PsrMediaCard.vue    # Tarjeta multimedia para videos e imágenes (Cloudflare R2)
│   │   ├── PsrFestivosBox.vue  # Widget de festivos de Colombia consumidos por API
│   │   └── PsrConfirmBox.vue   # Confirmación HTTP 200/201 con $emit('reiniciar')
│   ├── views/                  # Vistas principales conectadas a Vue Router (.vue)
│   │   ├── InicioView.vue      # Ruta: /
│   │   ├── AcademiaView.vue    # Ruta: /academia
│   │   ├── RumbaView.vue       # Ruta: /rumba-aerobica
│   │   ├── PersonalizadasView.vue # Ruta: /personalizadas
│   │   ├── VestuariosView.vue  # Ruta: /vestuarios (Catálogo con filtro reactivo)
│   │   ├── ContratarView.vue   # Ruta: /contratar
│   │   ├── TalleresView.vue    # Ruta: /talleres
│   │   ├── NosotrosView.vue    # Ruta: /nosotros
│   │   ├── BlogView.vue        # Ruta: /blog
│   │   ├── BlogDetalleView.vue # Ruta dinámica: /blog/:slug (Detalle de ítem)
│   │   ├── ContactoView.vue    # Ruta: /contacto
│   │   └── RedNoDisponibleView.vue # Ruta: /red-no-disponible
│   ├── router/
│   │   └── index.js            # Definición de rutas SPA y scrollBehavior
│   ├── store/
│   │   └── estadoGlobal.js     # Estado reactivo centralizado compartido entre vistas
│   ├── services/
│   │   ├── almacenamiento.js   # Persistencia en localStorage (JSON)
│   │   └── clienteHttp.js      # Cliente HTTP fetch con async/await y estados HTTP
│   └── data/
│       └── contenidosPsr.js    # Colecciones de datos de programas, trajes y artículos
└── docs/                       # Documentación técnica y funcional del proyecto
    ├── ARQUITECTURA.md                 # Arquitectura por capas, flujo de datos y estructura
    ├── ESTANDARES_CODIGO.md            # Convenciones Vue 3, CSS modular y accesibilidad
    ├── REQUERIMIENTOS.md               # Reglas de negocio, RF por vista y matriz académica
    ├── INFORMACION_PSR.md              # Datos oficiales confirmados de la academia PSR
    └── GUIA_CODIGO_Y_COMPONENTES.md    # Catálogo detallado de componentes, vistas, props y emits
```

## Documentación Detallada (`docs/`)

Para facilitar la revisión y entrega del proyecto, la carpeta [`docs/`](docs/) incluye:

1. [**Arquitectura del Sistema (`docs/ARQUITECTURA.md`)**](docs/ARQUITECTURA.md): Diagrama general, árbol completo del proyecto y explicación técnica de cada capa (Vue 3, Vue Router, Store reactivo, Servicios HTTP/LocalStorage, Serverless Function con Brevo, Cloudflare R2 y CSS Grid/Flexbox).
2. [**Guía de Código y Componentes (`docs/GUIA_CODIGO_Y_COMPONENTES.md`)**](docs/GUIA_CODIGO_Y_COMPONENTES.md): Catálogo técnico de los 7 componentes reutilizables (`props` y `$emit`), funcionalidades reactivas de las 12 vistas, estructura JSON en `localStorage` y modelo de datos.
3. [**Requerimientos y Matriz Técnica (`docs/REQUERIMIENTOS.md`)**](docs/REQUERIMIENTOS.md): Reglas de negocio, requerimientos funcionales (RF-01 a RF-12), especificación de los 7 formularios y matriz de cumplimiento de requisitos académicos.
4. [**Estándares de Código (`docs/ESTANDARES_CODIGO.md`)**](docs/ESTANDARES_CODIGO.md): Convenciones de nombres, estructura de Single File Components (`.vue`), patrones de comunicación Padre-Hijo y criterios de accesibilidad (ARIA / HTML5 semántico).
5. [**Información Confirmada de PSR (`docs/INFORMACION_PSR.md`)**](docs/INFORMACION_PSR.md): Paleta de colores oficial, ubicación, horarios, tarifas y datos reales de la academia.

## Instrucciones de Instalación y Ejecución Local

1. **Clonar el repositorio e ingresar a la carpeta del proyecto:**
   ```bash
   git clone https://github.com/Jhannx/PSR-WEB-UNIVERSIDAD.git
   cd PSR-WEB-UNIVERSIDAD
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo local:**
   ```bash
   npm run dev
   ```

4. **Generar el paquete optimizado para producción (build):**
   ```bash
   npm run build
   ```

## Enlace de Producción

- **URL de Producción:** [https://psr-web-universidad.jhanpaulcorena285.workers.dev](https://psr-web-universidad.jhanpaulcorena285.workers.dev)

## Autor

- **Desarrollador:** Jhan Corena Segura
- **Entorno:** Versión Académica — Universidad
