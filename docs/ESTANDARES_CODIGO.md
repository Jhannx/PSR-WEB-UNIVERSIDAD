# Estándares de Código

## Reglas de desarrollo

Para mantener el código ordenado, modular y fácil de revisar, seguimos estas reglas en la aplicación **Vue 3 + Vite**:

### 1. Arquitectura en Componentes de Archivo Único (`.vue`)
* **Vistas (`src/views/`):** Cada pantalla conectada a una ruta de `Vue Router` tiene su propio componente de vista (ej. `InicioView.vue`, `AcademiaView.vue`, `VestuariosView.vue`).
* **Componentes reutilizables (`src/components/`):** Los bloques compartidos (cabecera, pie de página, portadas, tarjetas de contenido, tarjetas multimedia, widgets de API y confirmaciones de formulario) se aíslan en componentes independientes.
* **Comunicación entre componentes:** Los datos descienden del padre al hijo mediante **`props`** (`defineProps`) y las acciones del hijo se notifican al padre mediante eventos personalizados **`$emit`** (`defineEmits`).

### 2. Separación de responsabilidades
* **Templates HTML (`.vue`):** Estructura semántica (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) y directivas reactivas de Vue (`v-model`, `v-for`, `v-if / v-else`, `v-bind`, `v-on`). Cero estilos en línea (`style="..."`).
* **CSS (`css/`):** Diseño, colores, tipografía, macroestructura con CSS Grid (`body`), componentes con Flexbox y adaptabilidad móvil/escritorio en 3 breakpoints (`768px`, `992px`, `1200px`).
* **Estado y Servicios (`src/store/` y `src/services/`):**
  * `estadoGlobal.js`: Estado reactivo centralizado (`reactive`) compartido entre todas las vistas.
  * `clienteHttp.js`: Peticiones HTTP asíncronas (`fetch` con `async / await`) y validación de códigos de estado (`200/201`, `404`, `500`).
  * `almacenamiento.js`: Persistencia en el navegador con `localStorage` en formato JSON.

### 3. Uso y personalización de Bootstrap
* Los colores de la academia y fuentes se personalizan sobrescribiendo las variables de Bootstrap en **css/base/variables.css**.
* Las clases propias del proyecto usan el prefijo **psr-** (ejemplo: `.psr-btn-flame`, `.psr-card`, `.psr-section`), para distinguir a simple vista qué es propio de la academia y qué es utilidad de Bootstrap.

### 4. Nombres de archivos y elementos
* **Componentes y Vistas de Vue (`.vue`):** En formato `PascalCase` siguiendo la convención de Vue (`PsrCard.vue`, `PsrHeader.vue`, `AcademiaView.vue`).
* **Rutas de Vue Router y archivos CSS:** En minúsculas con guiones (`/rumba-aerobica`, `header-footer.css`).
* **Clases e IDs en CSS/HTML:** En minúsculas con guiones (`class="psr-card"`, `id="form-contacto"`).
* **Variables y funciones en JS:** En formato `camelCase` (`enviarCorreoFormulario()`, `cargarFestivos()`).

### 5. Accesibilidad y HTML semántico
* Todo campo de formulario lleva su etiqueta `<label for="...">` asociada por `id` y validación nativa (`required`, `type="email"`, `type="tel"`).
* Los íconos decorativos llevan `aria-hidden="true"` y los botones que solo tienen ícono llevan un atributo `aria-label` descriptivo.
