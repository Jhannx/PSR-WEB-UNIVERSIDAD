# Requerimientos del Proyecto y Matriz de Cumplimiento Técnico

## 1. Objetivo del Sistema

**PSR Web** es la aplicación web de página única (**SPA** construida con **Vue 3**, **Vue Router 4** y **Vite 6**) para la **Escuela de Baile Pioneros de la Salsa y Ritmos (PSR)** de Sincelejo (Sucre), con 16 años de trayectoria artística y formativa.

El sistema digitaliza la oferta académica y de servicios de la escuela: formación regular por edades, sesiones de rumba aeróbica con calculadora interactiva de costos, clases personalizadas, alquiler de vestuarios con filtro reactivo, cotización de shows para eventos, talleres institucionales, blog comunitario con rutas dinámicas y consulta en tiempo real de días festivos de Colombia.

---

## 2. Reglas de Negocio Confirmadas

1. **Centralización de contacto por correo y formularios web (Sin WhatsApp ni teléfono público):**
   La academia no publica números telefónicos ni enlaces a WhatsApp. Toda solicitud de inscripción, reserva o cotización se canaliza hacia `escuelapsr@gmail.com` mediante los **7 formularios especializados** de la plataforma.
2. **Persistencia automática de borradores (`psr_borradores`):**
   Si un usuario comienza a llenar un formulario y cambia de vista dentro de la SPA o recarga la pestaña del navegador, los datos escritos se conservan automáticamente gracias a la sincronización entre `v-model`, `estadoGlobal.borradores` y `localStorage`.
3. **Registro local de solicitudes enviadas (`psr_solicitudes`):**
   Cada envío exitoso (HTTP `200` o `201`) registra una copia estructurada de la solicitud con marca de tiempo en `localStorage` y limpia el borrador del formulario correspondiente.
4. **Calendario de días festivos sin clase (API Pública de Colombia):**
   En todas las vistas asociadas a clases presenciales (`/academia`, `/rumba-aerobica`, `/personalizadas`, `/talleres`) y en `/contacto`, se informan los próximos 3 días festivos oficiales en Colombia consultados desde `date.nager.at`, indicando que en dichas fechas no hay sesión.
5. **Acceso permanente al contacto (`.psr-fab`):**
   Un botón flotante permanece visible en todas las pantallas para dirigir al usuario directamente a `/contacto#formulario`.
6. **Manejo informativo de redes no disponibles (`/red-no-disponible`):**
   Dado que la academia cuenta con Instagram y Facebook oficiales pero no tiene cuenta activa en TikTok, el enlace de TikTok en el pie de página dirige a una vista interna informativa (`/red-no-disponible`) que ofrece las alternativas oficiales sin romper la experiencia de navegación.

---

## 3. Requerimientos Funcionales por Vista (`src/views/`)

| ID | Vista y Ruta | Descripción Funcional y Componentes Clave |
| :--- | :--- | :--- |
| **RF-01** | **Inicio**<br>`/`<br>`InicioView.vue` | Portada principal (`.psr-hero`), sección de cifras confirmadas (`16` años, `6` profesores, `4` categorías) generada con `v-for`, tarjetas de los 3 programas principales (`PsrCard`), sección de identidad institucional y llamado a la acción final. |
| **RF-02** | **Academia**<br>`/academia`<br>`AcademiaView.vue` | Beneficios formativos en tarjetas destacadas (`.psr-card-featured`), galería de videos desde Cloudflare R2 (`PsrMediaCard`), acordeón de horarios por categoría de edad, widget de festivos (`PsrFestivosBox`), acordeón de preguntas frecuentes (FAQ) y formulario `form-inscripcion`. |
| **RF-03** | **Rumba Aeróbica**<br>`/rumba-aerobica`<br>`RumbaView.vue` | **Calculadora reactiva de tarifas** con `v-model` y `computed` (calcula en pesos colombianos el valor por 1 clase diaria a $4.000, 4 clases semanales a $16.000 o 16 clases mensuales a $64.000), widget de festivos, videos de sesiones en R2 y formulario `form-rumba`. |
| **RF-04** | **Personalizadas**<br>`/personalizadas`<br>`PersonalizadasView.vue` | Catálogo de 3 ritmos (Salsa, Bachata y Champeta) renderizado con `PsrCard`. Al pulsar *"Elegir este ritmo"*, el componente hijo emite `$emit('seleccionar', item)`, preselecciona el ritmo en `form-personalizadas` y desplaza la vista al formulario. |
| **RF-05** | **Contratar Shows**<br>`/contratar`<br>`ContratarView.vue` | Presentación de 3 formatos de espectáculo (Pareja, Ensamble Grupal y Hora Loca) con preselección directa vía `$emit('seleccionar')`, galería de 6 videos reales de competencias y muestras en R2 (`PsrMediaCard`) y formulario `form-contratar`. |
| **RF-06** | **Talleres**<br>`/talleres`<br>`TalleresView.vue` | Modalidades de capacitación para colegios, universidades y empresas con preselección vía `$emit('seleccionar')`, galería foto/video de talleres 2025 en R2, widget de festivos y formulario `form-talleres`. |
| **RF-07** | **Vestuarios**<br>`/vestuarios`<br>`VestuariosView.vue` | **Catálogo interactivo con filtro reactivo** por género (`todos`, `salsa`, `bachata`, `fantasia`) mediante propiedad computada `vestuariosFiltrados`, preselección de línea de traje hacia `form-vestuarios` vía `$emit('seleccionar')` y consulta de disponibilidad. |
| **RF-08** | **Nosotros**<br>`/nosotros`<br>`NosotrosView.vue` | Reseña histórica de los 16 años de PSR en Sincelejo, fotografía general del cuerpo docente desde R2, cuadrícula de los 6 profesores (`PsrCard`) y pilares pedagógicos. |
| **RF-09** | **Comunidad y Blog**<br>`/blog`<br>`BlogView.vue` | Índice de artículos y noticias de la academia con accesos rápidos por categoría, tarjetas de resumen con `<time>` semántico y galería *"Momentos PSR"* (`PsrMediaCard`) con enlaces profundos a secciones multimedia. |
| **RF-10** | **Detalle de Artículo**<br>`/blog/:slug`<br>`BlogDetalleView.vue` | **Ruta dinámica parametrizada**. Recibe `:slug` como `prop` (`anuncios`, `clases`, `comunidad`, `presentaciones`), renderiza secciones, listas, citas (`<blockquote>`), galerías multimedia integradas (`PsrMediaCard`), navegación *Anterior / Siguiente* calculada con `computed` y pantalla de respaldo si el `slug` no existe (`v-else`). |
| **RF-11** | **Contacto**<br>`/contacto`<br>`ContactoView.vue` | Información de la sede principal en etiqueta `<address>`, horarios de atención, widget `PsrFestivosBox`, botón externo a Google Maps, enlaces a redes oficiales, formulario general `form-contacto` y preguntas frecuentes de atención. |
| **RF-12** | **Red No Disponible**<br>`/red-no-disponible`<br>`RedNoDisponibleView.vue` | Vista informativa cuando el usuario pulsa el ícono de TikTok en el pie de página, explicando que el canal no está activo y ofreciendo enlaces directos a Instagram, Facebook y retorno al inicio. |

---

## 4. Especificación de los 7 Formularios Reactivos

Todos los formularios están validados tanto en el cliente (atributos HTML5) como en el servidor (`functions/api/send-email.js` mediante el conjunto `FORMULARIOS_PERMITIDOS`):

| ID del Formulario (`formId`) | Vista donde se ubica | Campos del Modelo Reactivo (`CAMPOS_INICIALES`) |
| :--- | :--- | :--- |
| `form-inscripcion` | `AcademiaView.vue` (`/academia`) | `nombre`, `telefono`, `categoria`, `nivel` (`"principiante"`), `mensaje` |
| `form-rumba` | `RumbaView.vue` (`/rumba-aerobica`) | `nombre`, `telefono`, `correo`, `dia`, `mensaje` |
| `form-personalizadas` | `PersonalizadasView.vue` (`/personalizadas`) | `nombre`, `telefono`, `correo`, `ritmo`, `modalidad`, `horario`, `detalles` |
| `form-contratar` | `ContratarView.vue` (`/contratar`) | `nombre`, `telefono`, `correo`, `tipo_evento`, `fecha_evento`, `lugar`, `formato`, `detalles` |
| `form-talleres` | `TalleresView.vue` (`/talleres`) | `institucion`, `contacto`, `correo`, `telefono`, `tipo_organizacion`, `participantes`, `detalles` |
| `form-vestuarios` | `VestuariosView.vue` (`/vestuarios`) | `nombre`, `telefono`, `correo`, `linea`, `cantidad`, `fecha_evento`, `detalles` |
| `form-contacto` | `ContactoView.vue` (`/contacto`) | `nombre`, `correo`, `telefono`, `motivo`, `mensaje` |

---

## 5. Matriz de Cumplimiento de Requisitos Académicos

Esta tabla sirve como guía rápida para verificar dónde se cumple cada criterio técnico exigido en la entrega:

| Criterio Técnico / Académico | Implementación en el Proyecto | Archivos de Referencia |
| :--- | :--- | :--- |
| **Arquitectura SPA con Vue 3 y Vite** | Inicialización con `createApp(App)`, componentes `.vue` (SFC) con `<script setup>` y empaquetado con Vite. | `src/main.js`, `src/App.vue`, `vite.config.js`, `package.json` |
| **Enrutamiento con Vue Router (Rutas estáticas y dinámicas)** | 12 rutas configuradas con `createWebHistory()`, incluyendo la ruta dinámica `/blog/:slug` con `props: true` y `scrollBehavior`. | `src/router/index.js`, `src/views/BlogDetalleView.vue` |
| **Comunicación entre componentes (`props` y `$emit`)** | Uso de `defineProps` en 5 componentes hijos y `defineEmits` en `PsrCard.vue` (`@seleccionar`) y `PsrConfirmBox.vue` (`@reiniciar`). | `src/components/PsrCard.vue`, `src/components/PsrConfirmBox.vue`, `src/views/VestuariosView.vue` |
| **Directivas reactivas (`v-model`, `v-for`, `v-if/v-else`, `v-bind`, `v-on`)** | Aplicadas en los 7 formularios (`v-model`), listados de tarjetas/acordeones (`v-for`), estados de carga/error/confirmación (`v-if/v-else`) y filtros (`@click`, `:class`). | Todas las vistas en `src/views/*.vue` y `src/components/*.vue` |
| **Estado reactivo (`ref`, `computed`, `reactive`)** | Estado global compartido con `reactive()` y cálculos derivados con `computed()` (calculadora de tarifas en Rumba, filtro en Vestuarios, navegación en BlogDetalle). | `src/store/estadoGlobal.js`, `src/views/RumbaView.vue`, `src/views/VestuariosView.vue` |
| **Consumo de API externa con `fetch` y `async/await` (GET y POST)** | `GET` a `date.nager.at` para festivos de Colombia; `POST` a `/api/send-email` (producción con Brevo) o `jsonplaceholder.typicode.com/posts` (desarrollo local). | `src/services/clienteHttp.js`, `src/components/PsrFestivosBox.vue`, `functions/api/send-email.js` |
| **Manejo de estados HTTP (`200/201`, `401/403`, `404`, `500`)** | Validación explícita de `respuesta.status` en `peticionHttp()` mostrando `.psr-loader` durante la espera, `.psr-http-error` en fallos y `PsrConfirmBox` en `200/201`. | `src/services/clienteHttp.js`, `src/components/PsrConfirmBox.vue` |
| **Persistencia en navegador (`localStorage` con JSON)** | Lectura y escritura con `JSON.stringify` y `JSON.parse` para borradores (`psr_borradores`) e historial de solicitudes (`psr_solicitudes`). | `src/services/almacenamiento.js`, `src/store/estadoGlobal.js` |
| **Diseño con CSS Grid, Flexbox y 3 Breakpoints Responsive** | `display: grid` en `body` y footer desktop; `display: flex` en navegación y tarjetas; media queries en `768px`, `992px` y `1200px`. | `css/base/global.css`, `css/layout/header-footer.css`, `css/components/cards.css` |
