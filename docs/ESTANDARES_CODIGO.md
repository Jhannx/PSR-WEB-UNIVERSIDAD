# Estándares de Código y Patrones de Desarrollo

Este documento describe las reglas de estilo, patrones de programación en **Vue 3**, convenciones de **CSS3 / Bootstrap 5** y criterios de **accesibilidad web** aplicados en el código fuente de **PSR Web**.

---

## 1. Convenciones de Nomenclatura

| Elemento | Convención | Ejemplos Reales del Proyecto |
| :--- | :--- | :--- |
| **Vistas de Vue (`src/views/`)** | `PascalCase` con sufijo `View.vue` | `InicioView.vue`, `AcademiaView.vue`, `BlogDetalleView.vue` |
| **Componentes de Vue (`src/components/`)** | `PascalCase` con prefijo `Psr` | `PsrHeader.vue`, `PsrCard.vue`, `PsrMediaCard.vue`, `PsrFestivosBox.vue` |
| **Módulos JS (`src/services/`, `src/store/`, `src/data/`)** | `camelCase.js` | `clienteHttp.js`, `almacenamiento.js`, `estadoGlobal.js`, `contenidosPsr.js` |
| **Funciones y variables reactivas en JS** | `camelCase` en español descriptivo | `procesarEnvio()`, `guardarCambio()`, `vestuariosFiltrados`, `modalidadTarifa` |
| **Constantes de configuración** | `UPPER_SNAKE_CASE` | `ID_FORM`, `CAMPOS_INICIALES`, `R2_BASE_URL`, `CLAVE_BORRADORES` |
| **Rutas en Vue Router (`path` y `name`)** | `kebab-case` en minúsculas | `/rumba-aerobica`, `/red-no-disponible`, `blog-detalle` |
| **Clases CSS propias** | `kebab-case` con prefijo `.psr-` | `.psr-btn-flame`, `.psr-card-featured`, `.psr-section-purple`, `.psr-fab` |
| **Variables CSS (`:root`)** | `--psr-*` y `--bs-*` | `--psr-purple`, `--psr-orange`, `--psr-magenta`, `--psr-cyan` |

---

## 2. Estructura de Componentes de Archivo Único (SFC `.vue`)

Todos los componentes y vistas utilizan la sintaxis moderna **`<script setup>`** de **Vue 3 Composition API** y respetan el siguiente orden estructural:

### 2.1. Bloque `<script setup>`
1. **Importaciones de Vue y Vue Router:** `ref`, `computed`, `onMounted`, `useRoute`, `RouterView`.
2. **Importaciones de datos, estado y servicios:** `contenidosPsr.js`, `estadoGlobal.js`, `clienteHttp.js`.
3. **Importaciones de componentes hijos:** `PsrPageHero`, `PsrCard`, `PsrMediaCard`, `PsrFestivosBox`, `PsrConfirmBox`.
4. **Declaración de Props y Eventos:**
   - `defineProps({ ... })` con validación explícita de tipo (`type: Object | String | Boolean`), obligatoriedad (`required: true`) o valor por defecto (`default`).
   - `defineEmits(["seleccionar"])` o `defineEmits(["reiniciar"])` para documentar claramente los eventos que el componente hijo emite hacia el padre.
5. **Estado reactivo local, propiedades computadas y métodos:** Declaración de referencias con `ref()`, cálculos derivados con `computed()` y manejadores de eventos.

### 2.2. Bloque `<template>`
* **HTML5 semántico estricto:** Uso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<address>`, `<blockquote>`, `<time>` y `<footer>`.
* **Cero estilos en línea:** Ningún componente de Vue utiliza atributos `style="..."`; toda la presentación visual reside en la carpeta `css/`.
* **Uso de directivas de Vue:**
  * `v-for` siempre acompañado de `:key` única (`:key="programa.id"`, `:key="articulo.slug"`, `:key="festivo.date"`).
  * `v-if / v-else-if / v-else` para gestionar estados mutuamente excluyentes (ej. cargando API -> error HTTP -> lista con datos -> estado vacío).
  * `v-model` para enlace bidireccional en controles de formulario y selectores interactivos.

---

## 3. Patrones de Código Implementados

### 3.1. Comunicación Padre-Hijo (`props` hacia abajo, `$emit` hacia arriba)
El flujo de datos entre vistas y componentes es unidireccional:
* **Padre a Hijo (`props`):** La vista padre pasa objetos o configuraciones al componente hijo (`:item="ritmo"`, `texto-boton-seleccion="Elegir este ritmo"`).
* **Hijo a Padre (`$emit`):** Cuando el usuario hace clic en el botón de acción de `PsrCard.vue`, el componente hijo **no** modifica directamente el estado del formulario, sino que emite el evento `emit('seleccionar', item)`:

```vue
<!-- En PsrCard.vue (Hijo) -->
<button
  v-else-if="textoBotonSeleccion"
  type="button"
  class="btn psr-btn-soft btn-sm mt-2 align-self-start"
  @click="emit('seleccionar', item)"
>
  {{ textoBotonSeleccion }}
</button>
```

```vue
<!-- En PersonalizadasView.vue (Padre) -->
<PsrCard
  :item="ritmo"
  texto-boton-seleccion="Elegir este ritmo"
  @seleccionar="elegirRitmoDesdeTarjeta"
/>
```

Al recibir el evento, la vista padre asigna el valor al campo correspondiente del borrador reactivo, sincroniza `localStorage` y desplaza suavemente la pantalla hacia el formulario (`scrollIntoView({ behavior: "smooth" })`).

### 3.2. Patrón Estándar de Formularios Reactivos con Persistencia y Envío Asíncrono
Los **7 formularios** del proyecto implementan un contrato uniforme que garantiza persistencia automática de borradores y manejo de estados de red:

```javascript
const ID_FORM = "form-inscripcion";
const CAMPOS_INICIALES = {
  nombre: "",
  telefono: "",
  categoria: "",
  nivel: "principiante",
  mensaje: ""
};

// 1. Recupera borrador previo de localStorage o inicializa con CAMPOS_INICIALES
const formulario = estadoGlobal.obtenerBorrador(ID_FORM, CAMPOS_INICIALES);
const enviando = ref(false);
const errorHttp = ref("");
const respuestaServidor = ref(null);

// 2. Sincroniza en localStorage en cada evento @input / @change
function guardarCambio() {
  estadoGlobal.sincronizarBorrador(ID_FORM);
}

// 3. Envío HTTP POST asíncrono con manejo de estados y limpieza del borrador
async function procesarEnvio() {
  enviando.value = true;
  errorHttp.value = "";

  try {
    const respuesta = await enviarCorreoFormulario(ID_FORM, formulario);
    estadoGlobal.registrarSolicitud(ID_FORM, "Inscripción Academia", CAMPOS_INICIALES);
    respuestaServidor.value = respuesta;
  } catch (error) {
    errorHttp.value = error.message || "Error de red: No se pudo conectar con el servidor.";
  } finally {
    enviando.value = false;
  }
}
```

---

## 4. Arquitectura CSS y Personalización de Bootstrap 5

1. **Orden de importación en `css/styles.css`:**
   1. `libs/bootstrap.min.css` (Base del framework).
   2. `base/variables.css` (Tokens de diseño `--psr-*` y sobrescritura de variables `--bs-*`).
   3. `base/global.css` (Layout CSS Grid, tipografías y secciones).
   4. `layout/header-footer.css` (Cabecera, Offcanvas, Footer y botón flotante).
   5. `components/*.css` (`buttons.css`, `cards.css`, `accordion.css`, `forms.css`, `media.css`).
2. **Aislamiento de estilos con prefijo `.psr-`:**
   - Se utilizan las clases de grilla y espaciado de Bootstrap (`.container`, `.row`, `.col-12`, `.col-md-6`, `.col-lg-4`, `.g-4`, `.d-flex`, `.gap-3`), mientras que la identidad visual se aplica exclusivamente con clases `.psr-*`.
   - Los botones y acordeones personalizan Bootstrap redefiniendo sus variables CSS internas (`--bs-btn-bg`, `--bs-accordion-active-color`, etc.) en lugar de abusar de selectores complejos.

---

## 5. Estándares de Accesibilidad (A11y) y Rendimiento

* **Formularios accesibles:** Todo `<input>`, `<select>` y `<textarea>` tiene su etiqueta `<label for="...">` vinculada por `id`, atributos `name` y `autocomplete` apropiados, y validación HTML5 nativa (`required`, `type="email"`, `type="tel"`, `type="date"`, `minlength`).
* **Relaciones semánticas ARIA:**
  * Todas las etiquetas `<section>` cuentan con `aria-labelledby` apuntando al `id` de su encabezado `<h2>` o `<h1>`.
  * Los enlaces de navegación en `PsrHeader.vue` actualizan dinámicamente `:aria-current="esRutaActiva(...) ? 'page' : null"`.
  * Los botones de filtro en `VestuariosView.vue` están agrupados con `role="group"` y actualizan `:aria-pressed="filtroActual === boton.valor ? 'true' : 'false'"`.
  * Los íconos decorativos de Phosphor Icons llevan `aria-hidden="true"`, mientras que los enlaces o botones que solo contienen un ícono (como `.psr-fab`, `.psr-menu-toggle` y los enlaces a redes sociales) incluyen un `aria-label` descriptivo.
* **Respeto por preferencias de movimiento:** En `css/components/media.css` se incluye `@media (prefers-reduced-motion: reduce)` para desactivar transiciones en usuarios sensibles a las animaciones.
* **Optimización multimedia:** Las imágenes secundarias utilizan `loading="lazy"` y dimensiones explícitas (`width` y `height`), y los videos HTML5 utilizan `preload="metadata"` y `playsinline`.
