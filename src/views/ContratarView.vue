<script setup>
import { ref } from "vue";
import { formatosContratar, muestrasContratar } from "../data/contenidosPsr.js";
import { estadoGlobal } from "../store/estadoGlobal.js";
import { enviarCorreoFormulario } from "../services/clienteHttp.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrCard from "../components/PsrCard.vue";
import PsrMediaCard from "../components/PsrMediaCard.vue";
import PsrConfirmBox from "../components/PsrConfirmBox.vue";

const ID_FORM = "form-contratar";
const CAMPOS_INICIALES = {
  nombre: "",
  telefono: "",
  correo: "",
  tipo_evento: "",
  fecha_evento: "",
  lugar: "",
  formato: "",
  detalles: ""
};

const formulario = estadoGlobal.obtenerBorrador(ID_FORM, CAMPOS_INICIALES);
const enviando = ref(false);
const errorHttp = ref("");
const respuestaServidor = ref(null);

function guardarCambio() {
  estadoGlobal.sincronizarBorrador(ID_FORM);
}

/* Recibe el evento personalizado $emit('seleccionar', item) desde PsrCard */
function elegirFormatoDesdeTarjeta(item) {
  formulario.formato = item.valorSelect;
  guardarCambio();
  const seccion = document.getElementById("cotizacion");
  if (seccion) {
    seccion.scrollIntoView({ behavior: "smooth" });
  }
}

async function procesarEnvio() {
  enviando.value = true;
  errorHttp.value = "";

  try {
    const respuesta = await enviarCorreoFormulario(ID_FORM, formulario);
    estadoGlobal.registrarSolicitud(ID_FORM, "Cotización de Show", CAMPOS_INICIALES);
    respuestaServidor.value = respuesta;
  } catch (error) {
    errorHttp.value = error.message || "Error de red: No se pudo conectar con el servidor.";
  } finally {
    enviando.value = false;
  }
}

function reiniciarFormulario() {
  respuestaServidor.value = null;
  errorHttp.value = "";
}
</script>

<template>
  <!-- Seccion 1: Portada de Contratar -->
  <PsrPageHero
    eyebrow="ESPECTÁCULOS EN VIVO"
    titulo="Shows Coreográficos para Eventos"
    descripcion="Lleva la energía, elegancia y virtuosismo de nuestros bailarines a bodas, quinceañeros, eventos empresariales y celebraciones culturales en Sincelejo y la región."
  >
    <a class="btn psr-btn-flame" href="#cotizacion">
      Cotizar presentación <i class="ph-bold ph-arrow-down ms-1" aria-hidden="true"></i>
    </a>
  </PsrPageHero>

  <!-- Seccion 2: Formatos de Show -->
  <section class="psr-section" aria-labelledby="formatos-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">REPERTORIO Y MONTAJES</p>
        <h2 class="psr-title-xl" id="formatos-titulo">Formatos Disponibles para tu Celebración</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Adaptamos la puesta en escena, vestuarios y duración al tipo de público y espacio de tu evento.
        </p>
      </div>

      <div class="row g-4">
        <div
          v-for="formato in formatosContratar"
          :key="formato.id"
          class="col-12 col-md-4"
        >
          <PsrCard
            :item="formato"
            texto-boton-seleccion="Cotizar este formato"
            @seleccionar="elegirFormatoDesdeTarjeta"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 2.1: Muestras de Shows en Video (Cloudflare R2) -->
  <section class="psr-section psr-section-soft" id="muestras-shows" aria-labelledby="muestras-shows-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">PSR EN ESCENA</p>
        <h2 class="psr-title-xl" id="muestras-shows-titulo">Muestras de nuestros shows</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Explora algunos montajes de pareja, ensamble y animación antes de cotizar tu evento.
        </p>
      </div>
      <div class="row g-4">
        <div
          v-for="muestra in muestrasContratar"
          :key="muestra.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <PsrMediaCard :item="muestra" />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Formulario de Cotizacion -->
  <section class="psr-section psr-section-purple" id="cotizacion" aria-labelledby="formulario-cotizar-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center justify-content-center">
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow psr-eyebrow-light">SOLICITUD EN LÍNEA</p>
          <h2 class="h1 text-white" id="formulario-cotizar-titulo">Cotiza el Show de tu Evento</h2>
          <p class="psr-lead text-white-50 mt-3">
            Completa los datos de tu celebración y te enviaremos una propuesta formal con opciones de montaje, vestuario y presupuesto.
          </p>
          <div class="d-flex align-items-start gap-3 mt-4 text-white-50 small">
            <i class="ph-bold ph-shield-check text-warning fs-4 flex-shrink-0" aria-hidden="true"></i>
            <p class="mb-0">
              Puntualidad garantizada, bailarines uniformados y sonido revisado previamente con los organizadores.
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-7">
          <div class="p-4 p-md-5 rounded-4 bg-white text-dark shadow">
            <h3 class="h4 mb-3 text-dark">Formulario de Cotización de Shows</h3>

            <div
              v-if="enviando"
              class="psr-loader p-2 my-2 bg-light border rounded text-muted small"
            >
              Conectando con el servidor...
            </div>

            <div
              v-if="errorHttp"
              class="psr-http-error alert alert-danger small my-3"
            >
              {{ errorHttp }}
            </div>

            <PsrConfirmBox
              v-if="respuestaServidor"
              :respuesta-servidor="respuestaServidor"
              @reiniciar="reiniciarFormulario"
            />

            <form
              v-else
              class="row g-3"
              id="form-contratar"
              @submit.prevent="procesarEnvio"
              @input="guardarCambio"
              @change="guardarCambio"
            >
              <div class="col-12 col-md-6">
                <label class="form-label" for="contratar-nombre">Nombre o empresa solicitante *</label>
                <input
                  v-model="formulario.nombre"
                  class="form-control"
                  id="contratar-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre o razón social"
                  autocomplete="name"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contratar-telefono">Teléfono celular de contacto *</label>
                <input
                  v-model="formulario.telefono"
                  class="form-control"
                  id="contratar-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  autocomplete="tel"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contratar-correo">Correo electrónico *</label>
                <input
                  v-model="formulario.correo"
                  class="form-control"
                  id="contratar-correo"
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contratar-tipo">Tipo de evento *</label>
                <select
                  v-model="formulario.tipo_evento"
                  class="form-select"
                  id="contratar-tipo"
                  name="tipo_evento"
                  required
                >
                  <option value="" disabled>Selecciona el evento...</option>
                  <option value="boda">Matrimonio o Boda</option>
                  <option value="quinceanero">Quinceañero</option>
                  <option value="corporativo">Evento empresarial o Corporativo</option>
                  <option value="cultural">Festival, Feria o Muestra cultural</option>
                  <option value="cumpleanos">Cumpleaños o Fiesta privada</option>
                  <option value="otro">Otro tipo de celebración</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contratar-fecha">Fecha tentativa del evento *</label>
                <input
                  v-model="formulario.fecha_evento"
                  class="form-control"
                  id="contratar-fecha"
                  name="fecha_evento"
                  type="date"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contratar-lugar">Ciudad o municipio del evento *</label>
                <input
                  v-model="formulario.lugar"
                  class="form-control"
                  id="contratar-lugar"
                  name="lugar"
                  type="text"
                  placeholder="Ej. Sincelejo, Corozal, Tolú..."
                  required
                >
              </div>

              <div class="col-12">
                <label class="form-label" for="contratar-formato">Formato coreográfico sugerido *</label>
                <select
                  v-model="formulario.formato"
                  class="form-select"
                  id="contratar-formato"
                  name="formato"
                  required
                >
                  <option value="" disabled>Selecciona un formato...</option>
                  <option value="pareja">Show de Pareja de Baile (Salsa o Bachata)</option>
                  <option value="grupal">Ensamble Grupal Completo (6 a 16 bailarines)</option>
                  <option value="hora-loca">Hora Loca y Animación Interactiva</option>
                  <option value="paquete-completo">Paquete Mixto (Show + Animación de pista)</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label" for="contratar-detalles">
                  Requerimientos o detalles especiales (opcional)
                </label>
                <textarea
                  v-model="formulario.detalles"
                  class="form-control"
                  id="contratar-detalles"
                  name="detalles"
                  rows="3"
                  placeholder="Cuéntanos sobre el lugar, tarima o ritmo de preferencia..."
                ></textarea>
              </div>

              <div class="col-12 mt-4">
                <button class="btn psr-btn-flame w-100" type="submit" :disabled="enviando">
                  Solicitar cotización formal <i class="ph-bold ph-paper-plane-tilt ms-1" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
