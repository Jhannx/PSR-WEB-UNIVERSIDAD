# Arquitectura y Estructura de Carpetas

## ¿Cómo está organizado el proyecto?

El proyecto es una aplicación web de página única (**SPA**) construida con **Vue 3**, **Vue Router** y **Vite**. Para mantener el código limpio y fácil de mantener, la interfaz se divide en vistas (`src/views/`), componentes reutilizables (`src/components/`), estado centralizado (`src/store/`), servicios (`src/services/`) y hojas de estilo modulares (`css/`):

```text
PSR-WEB-UNIVERSIDAD/
  index.html
  package.json
  vite.config.js
  public/
    img/
    js/
    _redirects
  css/
    base/
    layout/
    components/
    libs/
    styles.css
  src/
    main.js
    App.vue
    components/
      PsrHeader.vue
      PsrFooter.vue
      PsrPageHero.vue
      PsrCard.vue
      PsrMediaCard.vue
      PsrFestivosBox.vue
      PsrConfirmBox.vue
    views/
      InicioView.vue
      AcademiaView.vue
      RumbaView.vue
      PersonalizadasView.vue
      VestuariosView.vue
      ContratarView.vue
      TalleresView.vue
      NosotrosView.vue
      BlogView.vue
      BlogDetalleView.vue
      ContactoView.vue
      RedNoDisponibleView.vue
    router/
      index.js
    store/
      estadoGlobal.js
    services/
      almacenamiento.js
      clienteHttp.js
    data/
      contenidosPsr.js
  docs/
  README.MD
```

## Decisiones de la arquitectura

### 1. Separación entre Vistas (`src/views/`) y Componentes (`src/components/`)
* **Vistas (`views/`):** Representan las pantallas completas asociadas a cada ruta en `Vue Router` (Inicio, Academia, Rumba Aeróbica, Personalizadas, Vestuarios, Contratar, Talleres, Nosotros, Blog, Detalle de Artículo y Contacto).
* **Componentes (`components/`):** Elementos reutilizables que reciben datos mediante **`props`** y notifican acciones al componente padre mediante eventos personalizados **`$emit`** (como `PsrCard.vue`, `PsrMediaCard.vue`, `PsrConfirmBox.vue` y `PsrHeader.vue`).

### 2. Enrutamiento SPA (`src/router/index.js`)
* Utiliza `Vue Router` para cambiar de vista sin recargar el navegador.
* Incluye la ruta dinámica `/blog/:slug` (`BlogDetalleView.vue`) para renderizar el detalle de cualquier artículo del blog según el parámetro de la URL.

### 3. Estado Centralizado (`src/store/estadoGlobal.js`)
* Implementado con `reactive()` de Vue 3 para compartir datos entre todas las vistas sin duplicar peticiones ni perder consistencia:
  * **Borradores de formularios (`psr_borradores`):** Sincronizados con `v-model` y `localStorage`.
  * **Solicitudes enviadas (`psr_solicitudes`):** Colección reactiva que actualiza al instante el contador de la barra de navegación y la tabla del modal de solicitudes.
  * **Días festivos de Colombia:** Consultados desde la API pública `date.nager.at` y compartidos entre las vistas de clases y contacto.

### 4. Archivo CSS principal (`css/styles.css`)
Importado en `src/main.js`, conserva la organización modular por capas:
* Librerías externas (`libs/bootstrap.min.css`).
* Variables y estilos base con CSS Grid (`base/`).
* Estructura general de cabecera y pie de página (`layout/`).
* Componentes visuales con Flexbox (`components/`).
