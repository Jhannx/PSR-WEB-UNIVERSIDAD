# Arquitectura del Sistema y Estructura del Proyecto

## 1. Visión General de la Arquitectura

**PSR Web** es una aplicación web de página única (**SPA — Single Page Application**) desarrollada con **Vue 3** (Composition API con `<script setup>`), **Vue Router 4** y **Vite 6**, complementada con una función serverless en **Cloudflare Pages Functions** (`functions/api/send-email.js`) y almacenamiento de medios en **Cloudflare R2**.

La arquitectura sigue un diseño modular por capas que separa la presentación (vistas y componentes reutilizables), el enrutamiento cliente, el estado reactivo centralizado, los servicios de infraestructura (HTTP y `localStorage`), los datos estructurados y la hoja de estilos modular.

```text
+-----------------------------------------------------------------------------------+
|                                NAVEGADOR DEL USUARIO                              |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Capa de Presentación (Vue 3 SFC)                                            |  |
|  |  - App.vue (Layout raíz: PsrHeader + <RouterView /> + PsrFooter)            |  |
|  |  - 12 Vistas (src/views/*.vue)                                              |  |
|  |  - 7 Componentes reutilizables (src/components/*.vue) con props y $emit     |  |
|  +---------------------+-----------------------------------+-------------------+  |
|                        |                                   |                      |
|                        v                                   v                      |
|  +-------------------------------------+   +-----------------------------------+  |
|  | Enrutador SPA (src/router/index.js) |   | Datos Estáticos y Catálogos       |  |
|  |  - createWebHistory()               |   | (src/data/contenidosPsr.js)       |  |
|  |  - 12 rutas (incluye /blog/:slug)   |   |  - Programas, horarios, trajes,   |  |
|  |  - scrollBehavior + meta.title      |   |    profesores, blog y URLs de R2  |  |
|  +-------------------------------------+   +-----------------------------------+  |
|                        |                                                          |
|                        v                                                          |
|  +-----------------------------------------------------------------------------+  |
|  | Estado Reactivo Centralizado (src/store/estadoGlobal.js)                    |  |
|  |  - reactive({ solicitudes, borradores, festivos })                          |  |
|  +---------------------+-----------------------------------+-------------------+  |
|                        |                                   |                      |
|                        v                                   v                      |
|  +-------------------------------------+   +-----------------------------------+  |
|  | Servicio de Persistencia Local      |   | Cliente HTTP Asíncrono            |  |
|  | (src/services/almacenamiento.js)    |   | (src/services/clienteHttp.js)     |  |
|  |  - localStorage ("psr_borradores")  |   |  - fetch() con async / await      |  |
|  |  - localStorage ("psr_solicitudes") |   |  - Control HTTP 200/201/404/500   |  |
|  +-------------------------------------+   +-----------------+-----------------+  |
+--------------------------------------------------------------|--------------------+
                                                               |
                   +-------------------------------------------+--------------------+
                   |                                           |                    |
                   v                                           v                    v
+-------------------------------------+   +-------------------------+   +-----------------------+
| API Pública Nager.Date (GET)        |   | Entorno Producción      |   | Entorno Local (Dev)   |
| date.nager.at/api/v3/PublicHolidays |   | POST /api/send-email    |   | JSONPlaceholder API   |
| Festivos de Colombia (CO)           |   | Cloudflare Function     |   | POST /posts (HTTP 201)|
+-------------------------------------+   | + Brevo SMTP API        |   +-----------------------+
                                          +-------------------------+
```

---

## 2. Árbol Completo de Directorios y Archivos

```text
PSR-WEB-UNIVERSIDAD/
├── index.html                          # Punto de entrada HTML5 de la SPA (#app)
├── package.json                        # Configuración NPM, dependencias (Vue 3, Vue Router 4, Vite 6)
├── vite.config.js                      # Configuración del empaquetador Vite y @vitejs/plugin-vue
├── _routes.json                        # Reglas de enrutamiento para Cloudflare Pages (/api/*)
├── LINK PRODUCCIÓN.txt                 # URL del despliegue activo en producción
├── README.MD                           # Documentación principal del repositorio
│
├── functions/                          # Backend Serverless (Cloudflare Pages Functions)
│   └── api/
│       └── send-email.js               # Endpoint POST /api/send-email conectado a Brevo SMTP
│
├── public/                             # Recursos estáticos servidos directamente en la raíz (/)
│   ├── _routes.json                    # Configuración de rutas de activos estáticos y API
│   ├── js/
│   │   └── bootstrap.bundle.min.js     # Script local de Bootstrap 5 (Offcanvas y Collapse)
│   └── img/                            # Fotografías locales e íconos SVG de redes sociales
│       ├── icons/                      # instagram.svg, facebook.svg, tiktok.svg
│       └── *.jpg / *.jpeg / *.png      # Imágenes de clases, shows, vestuarios y logos PSR
│
├── css/                                # Arquitectura CSS3 modular por capas
│   ├── styles.css                      # Punto de entrada CSS (importa todas las capas en orden)
│   ├── base/
│   │   ├── variables.css               # Custom Properties (:root) y sobrescritura de Bootstrap
│   │   └── global.css                  # Layout CSS Grid en body, tipografía y secciones
│   ├── layout/
│   │   └── header-footer.css           # Cabecera, navegación Offcanvas, pie de página y FAB
│   ├── components/
│   │   ├── buttons.css                 # Botones .psr-btn-flame, .psr-btn-soft, .psr-btn-outline-light
│   │   ├── cards.css                   # Tarjetas .psr-card, .psr-stat-card, .psr-card-featured, badges
│   │   ├── accordion.css               # Personalización de acordeones .psr-accordion
│   │   ├── forms.css                   # Inputs, selects, focus states y .psr-confirm-box
│   │   └── media.css                   # Contenedores multimedia 16:9, botón de play y loaders
│   └── libs/
│       ├── bootstrap.min.css           # Hoja de estilos base de Bootstrap 5
│       ├── fonts/                      # Tipografías locales de respaldo (Inter y Manrope woff2)
│       └── phosphor-icons/             # Iconografía local de respaldo (Phosphor Bold y Fill)
│
├── src/                                # Código fuente de la aplicación SPA en Vue 3
│   ├── main.js                         # Inicialización de createApp(App), registro de router y CSS
│   ├── App.vue                         # Componente raíz: <PsrHeader />, <main><RouterView /></main>, <PsrFooter />
│   │
│   ├── components/                     # Componentes reutilizables (.vue)
│   │   ├── PsrHeader.vue               # Barra de navegación superior y menú móvil Offcanvas
│   │   ├── PsrFooter.vue               # Pie de página institucional y botón flotante (.psr-fab)
│   │   ├── PsrPageHero.vue             # Portada reutilizable con props y <slot> para botones CTA
│   │   ├── PsrCard.vue                 # Tarjeta versátil con navegación o evento $emit('seleccionar')
│   │   ├── PsrMediaCard.vue            # Tarjeta multimedia para videos MP4 (R2) e imágenes con lazy loading
│   │   ├── PsrFestivosBox.vue          # Widget reactivo que muestra los próximos 3 festivos de Colombia
│   │   └── PsrConfirmBox.vue           # Caja de confirmación HTTP 200/201 con $emit('reiniciar')
│   │
│   ├── views/                          # Vistas de página completa conectadas a Vue Router (.vue)
│   │   ├── InicioView.vue              # Ruta: /
│   │   ├── AcademiaView.vue            # Ruta: /academia
│   │   ├── RumbaView.vue               # Ruta: /rumba-aerobica
│   │   ├── PersonalizadasView.vue      # Ruta: /personalizadas
│   │   ├── ContratarView.vue           # Ruta: /contratar
│   │   ├── TalleresView.vue            # Ruta: /talleres
│   │   ├── VestuariosView.vue          # Ruta: /vestuarios
│   │   ├── NosotrosView.vue            # Ruta: /nosotros
│   │   ├── BlogView.vue                # Ruta: /blog
│   │   ├── BlogDetalleView.vue         # Ruta dinámica: /blog/:slug (recibe slug como prop)
│   │   ├── ContactoView.vue            # Ruta: /contacto
│   │   └── RedNoDisponibleView.vue     # Ruta: /red-no-disponible
│   │
│   ├── router/
│   │   └── index.js                    # Configuración de Vue Router, scrollBehavior y títulos dinámicos
│   ├── store/
│   │   └── estadoGlobal.js             # Estado reactivo centralizado con reactive()
│   ├── services/
│   │   ├── almacenamiento.js           # Abstracción de lectura/escritura JSON en localStorage
│   │   └── clienteHttp.js              # Wrapper fetch() asíncrono y manejo de errores HTTP
│   └── data/
│       └── contenidosPsr.js            # Fuente de datos estructurados y enlaces a Cloudflare R2
│
└── docs/                               # Documentación técnica y funcional del proyecto
    ├── ARQUITECTURA.md                 # Arquitectura detallada del sistema (este documento)
    ├── ESTANDARES_CODIGO.md            # Convenciones, patrones Vue 3, CSS y accesibilidad
    ├── REQUERIMIENTOS.md               # Requerimientos funcionales, reglas de negocio y matriz técnica
    ├── INFORMACION_PSR.md              # Datos reales confirmados de la academia PSR
    └── GUIA_CODIGO_Y_COMPONENTES.md    # Catálogo detallado de componentes, vistas, props, emits y flujos
```

---

## 3. Detalle Técnico por Capas

### 3.1. Inicialización y Layout Raíz (`index.html`, `src/main.js`, `src/App.vue`)
1. **`index.html`:** Define los metadatos SEO en español (`lang="es"`), carga las fuentes (`Inter` y `Manrope`) e íconos (`Phosphor Icons`), expone el contenedor `<div id="app"></div>`, carga `bootstrap.bundle.min.js` para habilitar componentes interactivos de UI (acordeones y menú lateral Offcanvas) e importa el módulo principal `/src/main.js`.
2. **`src/main.js`:** Importa `createApp` de Vue, el componente raíz `App.vue`, la instancia de `router` y la hoja de estilos global `../css/styles.css`. Monta la aplicación en `#app`.
3. **`src/App.vue`:** Define la estructura permanente de la SPA:
   - `<PsrHeader />` en la parte superior.
   - `<main><RouterView /></main>` en el área central donde Vue Router inyecta dinámicamente la vista activa.
   - `<PsrFooter />` en la parte inferior (que incluye además el botón de acción flotante `.psr-fab`).

### 3.2. Enrutamiento SPA (`src/router/index.js`)
El enrutador utiliza `createWebHistory()` para URLs limpias sin `#` en la ruta base y gestiona **12 rutas**:
* **11 rutas estáticas:** `/`, `/academia`, `/rumba-aerobica`, `/personalizadas`, `/contratar`, `/talleres`, `/vestuarios`, `/nosotros`, `/blog`, `/contacto`, `/red-no-disponible`.
* **1 ruta dinámica parametrizada:** `/blog/:slug` asociada a `BlogDetalleView.vue` con `props: true`, lo que inyecta automáticamente el parámetro `:slug` de la URL como una `prop` dentro del componente de detalle.
* **Control de desplazamiento (`scrollBehavior`):** Si la ruta destino contiene un ancla (`to.hash`, como `/contacto#formulario` o `/academia#inscripcion`), realiza un desplazamiento suave (`behavior: "smooth"`) hacia el elemento; de lo contrario, posiciona la ventana al inicio (`top: 0`).
* **Actualización de título (`router.afterEach`):** Lee `to.meta.title` en cada transición de ruta y actualiza `document.title` para mejorar la accesibilidad y orientación del usuario.

### 3.3. Gestión de Estado Centralizado (`src/store/estadoGlobal.js`)
En lugar de sobrecargar el proyecto con librerías externas para un estado de alcance medio, se aprovecha la API reactiva nativa de Vue 3 mediante `reactive()`:
* **`borradores`:** Objeto reactivo indexado por `idFormulario` (`form-inscripcion`, `form-rumba`, `form-personalizadas`, `form-vestuarios`, `form-contratar`, `form-talleres`, `form-contacto`).
  * `obtenerBorrador(idFormulario, camposIniciales)`: Fusiona los valores por defecto con cualquier borrador previo recuperado de `localStorage`, devolviendo una referencia reactiva lista para enlazar con `v-model`.
  * `sincronizarBorrador(idFormulario)`: Persiste inmediatamente en `localStorage` cada vez que el usuario escribe (`@input` / `@change`) o selecciona un ítem desde una tarjeta (`$emit('seleccionar')`).
* **`solicitudes`:** Arreglo reactivo con el historial de formularios enviados con éxito (`psr_solicitudes`).
  * `registrarSolicitud(idFormulario, nombreFormulario, camposIniciales)`: Guarda la solicitud enviada al inicio de la colección (`unshift`), limpia el borrador de `localStorage` y restablece reactivamente los campos del formulario a sus valores iniciales.
* **`festivos`:** Objeto reactivo `{ lista: [], cargando: false, cargado: false, error: "" }`.
  * `cargarFestivos()`: Implementa un patrón de **caché en memoria** (`if (this.festivos.cargado || this.festivos.cargando) return;`). Así, aunque el usuario navegue entre `/academia`, `/rumba-aerobica`, `/personalizadas`, `/talleres` y `/contacto`, la petición HTTP `GET` a la API de días festivos se ejecuta **una única vez** por sesión.

### 3.4. Capa de Servicios (`src/services/`)
* **`almacenamiento.js`:** Encapsula todas las operaciones sobre `window.localStorage` bajo las claves `"psr_borradores"` y `"psr_solicitudes"`. Incluye bloques `try / catch` al ejecutar `JSON.parse()` para evitar fallos si el almacenamiento del navegador contiene datos corruptos.
* **`clienteHttp.js`:** Centraliza la comunicación de red con `fetch` y `async / await`:
  * **`peticionHttp(url, opciones)`:** Evalúa `respuesta.status` e interpreta el cuerpo JSON. Lanza errores descriptivos y diferenciados según el código HTTP:
    * `401` o `403`: Credencial o permiso rechazado por el servidor.
    * `404`: Recurso o ruta no encontrada en el servidor.
    * `>= 500`: Fallo interno en el servidor externo.
    * Cualquier código distinto de `200` y `201`: Error general con el código HTTP devuelto.
  * **`enviarCorreoFormulario(idFormulario, datos)`:** Detecta automáticamente el entorno mediante `window.location.hostname`:
    * **En desarrollo local (`localhost` o `127.0.0.1`):** Envía un `POST` a `https://jsonplaceholder.typicode.com/posts`, que responde con HTTP `201 Created` y un `{ id: 101 }`, permitiendo probar todo el flujo asíncrono sin depender de claves SMTP locales.
    * **En producción:** Envía un `POST` a `/api/send-email` con `{ formId: idFormulario, data: datos }`.
  * **`consultarFestivosColombia()`:** Consulta `https://date.nager.at/api/v3/PublicHolidays/{anio}/CO`, filtra los festivos cuya fecha (`f.date`) sea mayor o igual a la fecha actual (`hoy`) y retorna los próximos 3 festivos.

### 3.5. Función Serverless de Correo (`functions/api/send-email.js`)
Desplegada en **Cloudflare Pages Functions**, intercepta las peticiones `POST /api/send-email` (según la regla de `_routes.json`) y aplica múltiples capas de seguridad antes de despachar el correo a través de **Brevo (`https://api.brevo.com/v3/smtp/email`)**:
1. **Validación de origen (Same-Origin):** Rechaza con HTTP `403` si la cabecera `Origin` no coincide con el dominio de la aplicación.
2. **Validación de formato y tamaño:** Exige `Content-Type: application/json` (HTTP `415`) y un `Content-Length` menor o igual a 20 KB (HTTP `413`).
3. **Lista blanca de formularios (`FORMULARIOS_PERMITIDOS`):** Solo acepta los 7 identificadores de formulario oficiales de la aplicación y un máximo de 40 campos de tipo `string` (máximo 3.000 caracteres por campo).
4. **Honeypot anti-spam (`campos.website`):** Si un bot completa el campo oculto `website`, devuelve HTTP `201` simulando éxito sin consumir cuota de correo.
5. **Prevención de XSS en correo HTML (`escaparHTML`):** Escapa `&`, `<`, `>`, `"`, `'` antes de construir la tabla HTML del mensaje y configura `replyTo` con el correo ingresado por el usuario.

### 3.6. Almacenamiento Multimedia en la Nube (Cloudflare R2)
Para mantener el repositorio Git liviano y optimizar la carga del bundle de Vite, los videos MP4 de muestras coreográficas, talleres, sesiones de rumba y fotografías de alta resolución se sirven desde un bucket público de **Cloudflare R2** definido en `src/data/contenidosPsr.js` mediante la constante:
```javascript
export const R2_BASE_URL = "https://pub-d18bad3a62a14a5782da8b0cf5ee37cf.r2.dev/psr-nuevo-contenido";
```
El componente `PsrMediaCard.vue` consume estos recursos configurando `preload="metadata"` y `playsinline` en etiquetas `<video>` y `loading="lazy"` en imágenes.

### 3.7. Arquitectura CSS Modular (`css/`)
El diseño combina la grilla y utilidades de **Bootstrap 5** con un sistema de diseño propio bajo el prefijo `.psr-`:
* **Macroestructura con CSS Grid (`css/base/global.css`):** El elemento `body` define `display: grid` con `grid-template-areas: "header" "main" "footer"` y `grid-template-rows: auto 1fr auto` para garantizar un pie de página siempre adherido al borde inferior (`min-height: 100vh`). El contenedor `#app` utiliza `display: contents` para que los hijos directos de `App.vue` (`.psr-header`, `main`, `.psr-footer`) participen directamente como celdas del Grid del `body`.
* **Microestructura con Flexbox:** Empleada en la barra superior (`.psr-header-top`), menú de navegación (`.psr-nav`), tarjetas (`.psr-card`, `.psr-card-body`), cajas de confirmación (`.psr-confirm-box`) y botones de filtro.
* **Adaptabilidad Responsive en 3 Breakpoints:**
  * `>= 768px` (Tablet): Ajustes tipográficos, padding de secciones y distribución en fila del pie de página.
  * `>= 992px` (Escritorio): Transformación del menú lateral Offcanvas en barra de navegación horizontal y pie de página en grilla de 3 columnas (`1fr auto 1fr`).
  * `>= 1200px` (Pantalla ancha): Escalado de títulos principales (`.psr-title-xl` a `3.75rem`), mayor espaciado de secciones y botón flotante ampliado.
