# Guía del Código Fuente, Componentes, Vistas y Servicios

Este documento explica en detalle cómo funciona cada módulo JavaScript y cada componente `.vue` del proyecto **PSR Web**, sirviendo como manual técnico para mantenimiento, revisión de código y sustentación académica.

---

## 1. Catálogo de Componentes Reutilizables (`src/components/`)

Los 7 componentes reutilizables encapsulan la interfaz y se comunican con las vistas mediante **`props`** (`defineProps`) y eventos personalizados **`$emit`** (`defineEmits`):

| Componente | Props que recibe (`defineProps`) | Eventos que emite (`defineEmits`) | Responsabilidad y Funcionamiento |
| :--- | :--- | :--- | :--- |
| **`PsrHeader.vue`** | *(Ninguna)* | *(Ninguno)* | Renderiza la barra superior institucional y el menú de navegación SPA con `<RouterLink>`. Usa `useRoute()` para calcular `esRutaActiva(ruta)` (marcando activo `/blog` también cuando se visita `/blog/:slug`) y cierra automáticamente el panel móvil Offcanvas de Bootstrap (`cerrarMenuMovil()`) al navegar. |
| **`PsrFooter.vue`** | *(Ninguna)* | *(Ninguno)* | Renderiza el pie de página con marca, derechos de autor, enlaces a redes oficiales (Instagram, Facebook y ruta interna `/red-no-disponible` para TikTok), lema de la escuela y el botón flotante fijo `.psr-fab` hacia `/contacto#formulario`. |
| **`PsrPageHero.vue`** | • `eyebrow` (`String`, req.)<br>• `titulo` (`String`, req.)<br>• `descripcion` (`String`, req.)<br>• `centrado` (`Boolean`, def: `false`) | *(Ninguno — utiliza `<slot>`)* | Genera la sección de portada morada (`.psr-section-purple`) de todas las vistas internas. Permite alternar entre diseño centrado o alineado a 8 columnas e inyecta botones de acción mediante `<slot></slot>` si el padre los provee (`v-if="$slots.default"`). |
| **`PsrCard.vue`** | • `item` (`Object`, req.)<br>• `textoBotonSeleccion` (`String`, def: `""`) | • `seleccionar` (envía el objeto `item` seleccionado al padre) | Tarjeta polivalente para programas, ritmos, vestuarios, formatos de show, talleres y profesores. Si `item.ruta` existe, muestra un `<RouterLink>`; si en cambio recibe `textoBotonSeleccion`, renderiza un botón que dispara `emit('seleccionar', item)`. |
| **`PsrMediaCard.vue`** | • `item` (`Object`, req.) | *(Ninguno)* | Tarjeta multimedia compatible con recursos de **Cloudflare R2** y archivos locales. Soporta 3 modos: figura simple (`item.esFigura`), reproductor de video MP4 (`item.tipo === 'video'`) con botón superpuesto `.psr-video-play` controlado por `ref(videoRef)` y estado `reproduciendo`, o tarjeta de imagen con `loading="lazy"`. |
| **`PsrFestivosBox.vue`** | • `mostrarTitulo` (`Boolean`, def: `true`) | *(Ninguno)* | Al montarse (`onMounted`), invoca `estadoGlobal.cargarFestivos()`. Renderiza de forma reactiva el indicador `.psr-loader` mientras espera respuesta, la alerta `.psr-http-error` si falla la red o la lista `<ul>` con los próximos 3 festivos oficiales de Colombia. |
| **`PsrConfirmBox.vue`** | • `respuestaServidor` (`Object`, def: `null`) | • `reiniciar` (notifica al formulario padre para volver a mostrar los campos) | Muestra el mensaje de éxito tras recibir HTTP `200` o `201`. Calcula con `computed` (`detalleId`) el identificador devuelto por el servidor (`messageId` en Brevo/Cloudflare o `id` en JSONPlaceholder) y ofrece el botón *"Enviar otra solicitud"*. |

---

## 2. Explicación Detallada de las Vistas (`src/views/`)

### 2.1. Vistas con Interactividad Reactiva Avanzada

#### A. Calculadora Reactiva de Tarifas en `RumbaView.vue` (`/rumba-aerobica`)
Demuestra el uso combinado de `ref()`, `v-model` y propiedades derivadas con `computed()`:
* El selector `<select v-model="modalidadTarifa">` cambia reactivamente entre `"diario"` (1 día), `"semanal"` (4 días) y `"mensual"` (16 días).
* La propiedad computada `precioFormateado` multiplica la tarifa base confirmada (`$4.000 COP`) por la cantidad de días y la formatea con `toLocaleString("es-CO")`:
  * Diario: **`$4.000 COP`**
  * Semanal: **`$16.000 COP`**
  * Mensual: **`$64.000 COP`**
* La propiedad computada `descripcionTarifa` actualiza en paralelo el texto explicativo sin recargar el DOM.

#### B. Filtro Reactivo de Catálogo en `VestuariosView.vue` (`/vestuarios`)
Demuestra el filtrado declarativo de colecciones con `ref()`, `computed()`, `v-for`, `v-bind` y `v-on`:
* El estado `filtroActual = ref("todos")` almacena el género activo (`"todos"`, `"salsa"`, `"bachata"` o `"fantasia"`).
* Los botones de filtro se generan con `v-for="boton in botonesFiltro"`, cambian su clase activa dinámicamente (`:class="filtroActual === boton.valor ? 'psr-btn-flame' : 'psr-btn-soft'"`) y actualizan `filtroActual` al hacer clic.
* La propiedad computada `vestuariosFiltrados` retorna toda la colección `catalogoVestuarios` cuando el filtro es `"todos"`, o filtra con `.filter(traje => traje.genero === filtroActual.value)` para mostrar únicamente las tarjetas del género elegido.

#### C. Preselección Tarjeta → Formulario vía `$emit('seleccionar')`
Implementada en 4 vistas (**`PersonalizadasView.vue`**, **`VestuariosView.vue`**, **`ContratarView.vue`** y **`TalleresView.vue`**):
1. El usuario explora las tarjetas `<PsrCard>` y pulsa el botón de selección (ej. *"Elegir este ritmo"*, *"Solicitar esta línea"*, *"Cotizar este formato"* o *"Solicitar esta modalidad"*).
2. `PsrCard.vue` emite `emit('seleccionar', item)` pasando el objeto de la tarjeta.
3. La vista padre ejecuta su función manejadora (`elegirRitmoDesdeTarjeta`, `elegirTrajeDesdeTarjeta`, `elegirFormatoDesdeTarjeta` o `elegirModalidadDesdeTarjeta`):
   - Asigna `item.valorSelect` al campo `<select>` del formulario reactivo.
   - Guarda inmediatamente el cambio en `localStorage` llamando a `guardarCambio()`.
   - Desplaza suavemente la pantalla hasta la sección del formulario con `scrollIntoView({ behavior: "smooth" })`.

#### D. Enrutamiento Dinámico en `BlogDetalleView.vue` (`/blog/:slug`)
Demuestra cómo una sola vista renderiza múltiples páginas a partir de un parámetro de ruta:
* En `src/router/index.js`, la ruta `/blog/:slug` define `props: true`.
* `BlogDetalleView.vue` recibe `slug` mediante `defineProps({ slug: { type: String, required: true } })`.
* Con tres propiedades `computed()` (`indiceActual`, `articulo`, `articuloAnterior` y `articuloSiguiente`):
  * Busca el artículo en `articulosBlog` (`anuncios`, `clases`, `comunidad` o `presentaciones`).
  * Renderiza dinámicamente sus párrafos, subtítulos, listas, cita destacada, galería de videos/fotos de Cloudflare R2 (`v-if="articulo.galeria"`) y bloque de llamado a la acción (`ctaRuta`).
  * Calcula los enlaces de navegación hacia el artículo anterior y siguiente en la parte inferior.
  * Si el usuario ingresa en la barra de direcciones un `:slug` inexistente (ej. `/blog/no-existe`), el bloque `v-else` muestra una vista controlada de *"Artículo no encontrado"* con botón de retorno a `/blog`.

---

## 3. Flujo de Datos en Servicios y Estado Global

### 3.1. Ciclo de Vida de un Borrador y una Solicitud (`estadoGlobal.js` + `almacenamiento.js`)

```text
[Usuario escribe en un input con v-model="formulario.campo"]
        │
        ▼
Evento @input / @change dispara guardarCambio()
        │
        ▼
estadoGlobal.sincronizarBorrador(ID_FORM)
        │
        ▼
almacenamiento.guardarBorrador(ID_FORM, datos)
        │
        ▼
localStorage.setItem("psr_borradores", JSON.stringify(borradores))
```

Cuando el usuario envía el formulario (`@submit.prevent="procesarEnvio"`):

```text
[procesarEnvio() activa enviando.value = true (.psr-loader)]
        │
        ▼
clienteHttp.enviarCorreoFormulario(ID_FORM, formulario)
  ├─ En localhost / 127.0.0.1 ──► POST https://jsonplaceholder.typicode.com/posts (HTTP 201)
  └─ En Producción ─────────────► POST /api/send-email ──► Brevo SMTP API (HTTP 201)
        │
        ├── Si ocurre error HTTP (401/403, 404, 500 o fallo de red):
        │     └─► catch (error) asigna errorHttp.value (.psr-http-error)
        │         (El borrador se conserva intacto para que el usuario no pierda sus datos)
        │
        └── Si responde HTTP 200 / 201:
              ├─► estadoGlobal.registrarSolicitud(ID_FORM, titulo, CAMPOS_INICIALES)
              ├─► Guarda registro con id: Date.now() y fecha es-CO en "psr_solicitudes"
              ├─► Elimina el borrador de "psr_borradores" y limpia los campos del formulario
              └─► Asigna respuestaServidor.value ──► Renderiza <PsrConfirmBox />
```

### 3.2. Estructura de Datos en `localStorage`

1. **Clave `"psr_borradores"` (Objeto JSON indexado por `formId`):**
   ```json
   {
     "form-personalizadas": {
       "nombre": "Jhan Corena",
       "telefono": "3001234567",
       "correo": "jhan@ejemplo.com",
       "ritmo": "salsa",
       "modalidad": "pareja",
       "horario": "noche",
       "detalles": "Aprender salsa desde cero"
     }
   }
   ```

2. **Clave `"psr_solicitudes"` (Arreglo JSON ordenado del más reciente al más antiguo):**
   ```json
   [
     {
       "id": 1732550000000,
       "formulario": "form-inscripcion",
       "tituloFormulario": "Inscripción Academia",
       "fecha": "25/11/2026",
       "datos": {
         "nombre": "María Pérez",
         "telefono": "3009876543",
         "categoria": "adultos",
         "nivel": "principiante",
         "mensaje": "Deseo iniciar este jueves"
       }
     }
   ]
   ```

---

## 4. Estructura del Módulo de Contenidos (`src/data/contenidosPsr.js`)

Centraliza toda la información estática y enlaces multimedia para mantener las vistas limpias de datos quemados:
* `R2_BASE_URL`: URL base del bucket público de Cloudflare R2 con los videos y fotografías de alta calidad.
* `cifrasInicio` y `programasPrincipales`: Datos de la página de inicio (`/`).
* `beneficiosAcademia`, `momentosAcademia`, `horariosAcademia` y `faqAcademia`: Datos de `/academia`.
* `momentosRumba`: Videos de sesiones de rumba aeróbica para `/rumba-aerobica`.
* `ritmosPersonalizadas`: Ritmos con su propiedad `valorSelect` para `/personalizadas`.
* `catalogoVestuarios`: Trajes con propiedades `genero` (para el filtro reactivo) y `valorSelect` (para preselección en el formulario) en `/vestuarios`.
* `formatosContratar` y `muestrasContratar`: Formatos y los 6 videos de competencias nacionales y muestras para `/contratar`.
* `modalidadesTalleres` y `galeriaTalleres`: Modalidades e historial audiovisual de talleres para `/talleres`.
* `profesoresNosotros` y `fotoProfesoresNosotros`: Perfiles de los 6 docentes e imagen grupal para `/nosotros`.
* `momentosBlog` y `articulosBlog`: Los 4 artículos completos (`anuncios`, `clases`, `comunidad`, `presentaciones`), cada uno con sus secciones, listas, citas, galerías multimedia anidadas (como la competencia en Viña del Mar, Chile, y el campeonato nacional Arrollando Dance) y llamadas a la acción.
