<script setup>
import { ref, computed } from "vue";
import { catalogoVestuarios } from "../data/contenidosPsr.js";
import { estadoGlobal } from "../store/estadoGlobal.js";
import { enviarCorreoFormulario } from "../services/clienteHttp.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrCard from "../components/PsrCard.vue";
import PsrConfirmBox from "../components/PsrConfirmBox.vue";

/* Filtro reactivo de catalogo con v-for, v-bind y v-on */
const filtroActual = ref("todos");

const botonesFiltro = [
  { valor: "todos", etiqueta: "Todos los trajes" },
  { valor: "salsa", etiqueta: "Salsa" },
  { valor: "bachata", etiqueta: "Bachata" },
  { valor: "fantasia", etiqueta: "Fantasía y Solistas" }
];

const vestuariosFiltrados = computed(function () {
  if (filtroActual.value === "todos") {
    return catalogoVestuarios;
  }
  return catalogoVestuarios.filter(function (traje) {
    return traje.genero === filtroActual.value;
  });
});

/* Formulario reactivo con persistencia en estadoGlobal / localStorage */
const ID_FORM = "form-vestuarios";
const CAMPOS_INICIALES = {
  nombre: "",
  telefono: "",
  correo: "",
  linea: "",
  cantidad: "",
  fecha_evento: "",
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
function elegirTrajeDesdeTarjeta(item) {
  formulario.linea = item.valorSelect;
  guardarCambio();
  const seccion = document.getElementById("disponibilidad");
  if (seccion) {
    seccion.scrollIntoView({ behavior: "smooth" });
  }
}

async function procesarEnvio() {
  enviando.value = true;
  errorHttp.value = "";

  try {
    const respuesta = await enviarCorreoFormulario(ID_FORM, formulario);
    estadoGlobal.registrarSolicitud(ID_FORM, "Alquiler de Vestuarios", CAMPOS_INICIALES);
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
  <!-- Seccion 1: Portada de Vestuarios -->
  <PsrPageHero
    eyebrow="ALQUILER Y CONFECCIÓN"
    titulo="Alquiler de Trajes y Vestuarios de Danza"
    descripcion="Ponemos a disposición de academias, colegios y parejas nuestro catálogo de trajes confeccionados para salsa, bachata y ritmos del Caribe con acabados profesionales."
  >
    <a class="btn psr-btn-flame" href="#disponibilidad">
      Consultar disponibilidad <i class="ph-bold ph-arrow-down ms-1" aria-hidden="true"></i>
    </a>
  </PsrPageHero>

  <!-- Seccion 2: Catalogo de Vestuarios -->
  <section class="psr-section" aria-labelledby="catalogo-titulo">
    <div class="container">
      <div class="text-center mb-4">
        <p class="psr-eyebrow">COLECCIÓN ESCÉNICA</p>
        <h2 class="psr-title-xl" id="catalogo-titulo">Líneas de Vestuario Disponibles</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Prendas diseñadas para resaltar el movimiento, con telas elásticas, pedrería y flecos de alta calidad para escenario.
        </p>
      </div>

      <!-- Botones de filtro por genero de baile -->
      <div
        class="d-flex flex-wrap justify-content-center gap-2 mb-5"
        role="group"
        aria-label="Filtrar vestuarios por género de baile"
      >
        <button
          v-for="boton in botonesFiltro"
          :key="boton.valor"
          class="btn btn-sm"
          :class="filtroActual === boton.valor ? 'psr-btn-flame' : 'psr-btn-soft'"
          type="button"
          :aria-pressed="filtroActual === boton.valor ? 'true' : 'false'"
          @click="filtroActual = boton.valor"
        >
          {{ boton.etiqueta }}
        </button>
      </div>

      <div class="row g-4">
        <div
          v-for="traje in vestuariosFiltrados"
          :key="traje.id"
          class="col-12 col-md-6 col-lg-3"
        >
          <PsrCard
            :item="traje"
            texto-boton-seleccion="Solicitar esta línea"
            @seleccionar="elegirTrajeDesdeTarjeta"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Formulario de Solicitud de Disponibilidad -->
  <section class="psr-section psr-section-purple" id="disponibilidad" aria-labelledby="formulario-vestuario-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center justify-content-center">
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow psr-eyebrow-light">SOLICITUD DE ALQUILER</p>
          <h2 class="h1 text-white" id="formulario-vestuario-titulo">Consulta Disponibilidad de Trajes</h2>
          <p class="psr-lead text-white-50 mt-3">
            Indícanos la fecha de tu evento, las tallas aproximadas y la cantidad de trajes. Te responderemos confirmando disponibilidad y tarifas de alquiler.
          </p>
          <div class="d-flex align-items-start gap-3 mt-4 text-white-50 small">
            <i class="ph-bold ph-hanger text-warning fs-4 flex-shrink-0" aria-hidden="true"></i>
            <p class="mb-0">
              Los trajes se entregan limpios, planchados y ajustados. Se requiere depósito de garantía reintegrable a la devolución.
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-7">
          <div class="p-4 p-md-5 rounded-4 bg-white text-dark shadow">
            <h3 class="h4 mb-3 text-dark">Formulario de Alquiler de Vestuarios</h3>

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
              id="form-vestuarios"
              @submit.prevent="procesarEnvio"
              @input="guardarCambio"
              @change="guardarCambio"
            >
              <div class="col-12 col-md-6">
                <label class="form-label" for="vestuario-nombre">Nombre de quien alquila *</label>
                <input
                  v-model="formulario.nombre"
                  class="form-control"
                  id="vestuario-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  autocomplete="name"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="vestuario-telefono">Teléfono celular de contacto *</label>
                <input
                  v-model="formulario.telefono"
                  class="form-control"
                  id="vestuario-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  autocomplete="tel"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="vestuario-correo">Correo electrónico *</label>
                <input
                  v-model="formulario.correo"
                  class="form-control"
                  id="vestuario-correo"
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="vestuario-linea">Línea de vestuario requerida *</label>
                <select
                  v-model="formulario.linea"
                  class="form-select"
                  id="vestuario-linea"
                  name="linea"
                  required
                >
                  <option value="" disabled>Selecciona una opción...</option>
                  <option value="salsa-pareja">Salsa en Pareja (Gala)</option>
                  <option value="salsa-grupal">Salsa Show Grupal (Ensamble)</option>
                  <option value="bachata">Línea Bachata y Ritmos Sensuales</option>
                  <option value="solista">Fantasía para Solista o Dúo</option>
                  <option value="otro">Otro tipo de traje o fantasía</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="vestuario-cantidad">Cantidad de trajes *</label>
                <select
                  v-model="formulario.cantidad"
                  class="form-select"
                  id="vestuario-cantidad"
                  name="cantidad"
                  required
                >
                  <option value="" disabled>Selecciona la cantidad...</option>
                  <option value="1">1 traje (solista)</option>
                  <option value="2">2 trajes (pareja)</option>
                  <option value="3-6">3 a 6 trajes (grupo pequeño)</option>
                  <option value="7-12">7 a 12 trajes (elenco mediano)</option>
                  <option value="mas-12">Más de 12 trajes (elenco completo)</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="vestuario-fecha">Fecha del evento o presentación *</label>
                <input
                  v-model="formulario.fecha_evento"
                  class="form-control"
                  id="vestuario-fecha"
                  name="fecha_evento"
                  type="date"
                  required
                >
              </div>

              <div class="col-12">
                <label class="form-label" for="vestuario-detalles">
                  Tallas estimadas y detalles de la presentación
                </label>
                <textarea
                  v-model="formulario.detalles"
                  class="form-control"
                  id="vestuario-detalles"
                  name="detalles"
                  rows="3"
                  placeholder="Indica tallas (S, M, L) o colores de preferencia para el vestuario..."
                ></textarea>
              </div>

              <div class="col-12 mt-4">
                <button class="btn psr-btn-flame w-100" type="submit" :disabled="enviando">
                  Consultar disponibilidad de trajes <i class="ph-bold ph-paper-plane-tilt ms-1" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
