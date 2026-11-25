# Requerimientos y Funcionalidades de la Web

## ¿Qué es PSR Web y qué hace?

Es la aplicación web de página única (**SPA** con **Vue 3**, **Vue Router** y **Vite**) para la escuela de baile **PSR (Pioneros de la Salsa y Ritmos)** en Sincelejo, con 16 años de trayectoria. Sirve para presentar los programas de formación, horarios, próximos días festivos sin clase, catálogo filtrable de vestuarios y permitir que los usuarios coticen shows o se inscriban mediante formularios reactivos.

## Reglas de negocio y funcionalidades clave

1. **Sin número de teléfono visible ni WhatsApp:**
   La academia centraliza la atención por correo electrónico (`escuelapsr@gmail.com`) o mediante los formularios del sitio web.
2. **Formularios reactivos con persistencia local (`v-model` + `localStorage`) y envío asíncrono (`fetch`):**
   * Mientras el usuario escribe en cualquiera de los 7 formularios, los datos se sincronizan mediante `v-model` con el estado global (`estadoGlobal.borradores`) y se guardan automáticamente en `localStorage` (formato JSON), persistiendo al cambiar de ruta o recargar el navegador.
   * Al enviar un formulario (`@submit.prevent`), se realiza una petición HTTP `POST` asíncrona (`async / await`), mostrando un indicador de carga (`.psr-loader`), evaluando los códigos HTTP (`200/201`, `404`, `500`) con `try / catch` y registrando la solicitud en el historial local (`psr_solicitudes`).
3. **Consumo de API pública de días festivos de Colombia:**
   En todas las secciones de clases (`/academia`, `/rumba-aerobica`, `/personalizadas`, `/talleres`) y en `/contacto`, el componente `PsrFestivosBox.vue` consulta la API `https://date.nager.at/api/v3/PublicHolidays/2026/CO` y muestra los próximos 3 festivos vigentes en los que no hay clase.
4. **Botón flotante permanente:**
   En todas las vistas hay un botón flotante con navegación directa al formulario de contacto (`/contacto#formulario`).

## Resumen de rutas y vistas (`src/views/`)

* **Inicio (`/` — `InicioView.vue`):** Portada principal, bienvenida, cifras de la academia (16 años de trayectoria, 6 profesores, 4 categorías) y tarjetas de programas principales.
* **Academia (`/academia` — `AcademiaView.vue`):** Niveles de formación por categorías de edad (preinfantil, infantil, juvenil y adultos), horarios en acordeón, próximos días festivos de Colombia, preguntas frecuentes y formulario reactivo de inscripción.
* **Rumba Aeróbica (`/rumba-aerobica` — `RumbaView.vue`):** Clases de acondicionamiento físico con baile ($4.000 COP por sesión), calculadora reactiva de tarifas según asistencia (diaria, semanal o mensual), próximos festivos de Colombia y formulario de registro.
* **Personalizadas (`/personalizadas` — `PersonalizadasView.vue`):** Clases privadas individuales o en pareja en Salsa, Bachata y Champeta, con selección directa desde cada tarjeta (`PsrCard` + `$emit`), próximos festivos de Colombia y formulario de solicitud.
* **Contratar Shows (`/contratar` — `ContratarView.vue`):** Formatos coreográficos y cotización de espectáculos de baile para bodas, quinceañeros, festivales o empresas.
* **Talleres (`/talleres` — `TalleresView.vue`):** Talleres de danza y pausas activas para colegios, universidades y empresas.
* **Vestuarios (`/vestuarios` — `VestuariosView.vue`):** Catálogo de trajes de baile para alquiler con filtro reactivo por género de baile (`Todos`, `Salsa`, `Bachata`, `Fantasía y Solistas`), preselección hacia el formulario mediante `$emit` y consulta de disponibilidad.
* **Nosotros (`/nosotros` — `NosotrosView.vue`):** Historia de 16 años de la academia en Sincelejo, pilares formativos y los 6 profesores de danza.
* **Comunidad y Blog (`/blog` — `BlogView.vue`):** Listado de publicaciones, anuncios, consejos de clase y reseñas de presentaciones.
* **Detalle de Artículo (`/blog/:slug` — `BlogDetalleView.vue`):** Vista dinámica que renderiza el artículo completo según el parámetro `:slug` (`anuncios`, `clases`, `comunidad` o `presentaciones`) con navegación entre publicaciones.
* **Contacto (`/contacto` — `ContactoView.vue`):** Dirección física, horarios de atención, próximos días festivos, enlace a Google Maps, acceso a la tabla de solicitudes guardadas y formulario general de contacto.
