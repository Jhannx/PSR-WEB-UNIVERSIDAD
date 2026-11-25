<script setup>
import { ref } from "vue";
import { modalidadesTalleres, galeriaTalleres } from "../data/contenidosPsr.js";
import { estadoGlobal } from "../store/estadoGlobal.js";
import { enviarCorreoFormulario } from "../services/clienteHttp.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrCard from "../components/PsrCard.vue";
import PsrMediaCard from "../components/PsrMediaCard.vue";
import PsrFestivosBox from "../components/PsrFestivosBox.vue";
import PsrConfirmBox from "../components/PsrConfirmBox.vue";

const ID_FORM = "form-talleres";
const CAMPOS_INICIALES = {
  institucion: "",
  contacto: "",
  correo: "",
  telefono: "",
  tipo_organizacion: "",
  participantes: "",
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
function elegirModalidadDesdeTarjeta(item) {
  formulario.tipo_organizacion = item.valorSelect;
  guardarCambio();
  const seccion = document.getElementById("solicitud");
  if (seccion) {
    seccion.scrollIntoView({ behavior: "smooth" });
  }
}

async function procesarEnvio() {
  enviando.value = true;
  errorHttp.value = "";

  try {
    const respuesta = await enviarCorreoFormulario(ID_FORM, formulario);
    estadoGlobal.registrarSolicitud(ID_FORM, "Solicitud de Taller", CAMPOS_INICIALES);
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
  <!-- Seccion 1: Portada de Talleres -->
  <PsrPageHero
    eyebrow="TALLERES Y FORMACIÓN"
    titulo="Talleres de Danza para Colegios y Empresas"
    descripcion="Llevamos metodologías dinámicas de baile, trabajo en equipo y expresión corporal a colegios, universidades y empresas en Sincelejo y Sucre."
  >
    <a class="btn psr-btn-flame" href="#solicitud">
      Solicitar propuesta de taller <i class="ph-bold ph-arrow-down ms-1" aria-hidden="true"></i>
    </a>
  </PsrPageHero>

  <!-- Seccion 2: Modalidades de Taller -->
  <section class="psr-section" aria-labelledby="modalidades-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">PROGRAMAS A MEDIDA</p>
        <h2 class="psr-title-xl" id="modalidades-titulo">Modalidades de Capacitación y Danza</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Diseñamos cada sesión según el perfil de los participantes, el objetivo del grupo y el espacio disponible.
        </p>
      </div>

      <div class="row g-4">
        <div
          v-for="modalidad in modalidadesTalleres"
          :key="modalidad.id"
          class="col-12 col-md-4"
        >
          <PsrCard
            :item="modalidad"
            texto-boton-seleccion="Solicitar esta modalidad"
            @seleccionar="elegirModalidadDesdeTarjeta"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 2.1: Galeria de Talleres en Accion (Cloudflare R2) -->
  <section class="psr-section psr-section-soft" id="galeria-talleres" aria-labelledby="galeria-talleres-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">TALLERES EN ACCIÓN</p>
        <h2 class="psr-title-xl" id="galeria-talleres-titulo">Así se viven nuestros talleres</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Registro de las actividades grupales y prácticas realizadas en 2025.
        </p>
      </div>
      <div class="row g-4">
        <div
          v-for="item in galeriaTalleres"
          :key="item.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <PsrMediaCard :item="item" />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Formulario de Solicitud -->
  <section class="psr-section psr-section-purple" id="solicitud" aria-labelledby="formulario-taller-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center justify-content-center">
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow psr-eyebrow-light">SOLICITUD DE PROPUESTA</p>
          <h2 class="h1 text-white" id="formulario-taller-titulo">Lleva un Taller a tu Institución</h2>
          <p class="psr-lead text-white-50 mt-3">
            Cuéntanos sobre tu organización y los objetivos del taller. Te enviaremos un plan pedagógico detallado con cotización según cantidad de personas y horas.
          </p>
          <div class="d-flex align-items-start gap-3 mt-4 text-white-50 small">
            <i class="ph-bold ph-chalkboard-teacher text-warning fs-4 flex-shrink-0" aria-hidden="true"></i>
            <p class="mb-0">
              Instructores certificados, metodología comprobada de 16 años y material musical adaptable a espacios cerrados o abiertos.
            </p>
          </div>
          <div class="mt-4 p-3 rounded-3 bg-white text-dark shadow-sm">
            <PsrFestivosBox />
          </div>
        </div>

        <div class="col-12 col-lg-7">
          <div class="p-4 p-md-5 rounded-4 bg-white text-dark shadow">
            <h3 class="h4 mb-3 text-dark">Formulario de Solicitud de Taller</h3>

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
              id="form-talleres"
              @submit.prevent="procesarEnvio"
              @input="guardarCambio"
              @change="guardarCambio"
            >
              <div class="col-12 col-md-6">
                <label class="form-label" for="taller-institucion">
                  Nombre de la institución o empresa *
                </label>
                <input
                  v-model="formulario.institucion"
                  class="form-control"
                  id="taller-institucion"
                  name="institucion"
                  type="text"
                  placeholder="Colegio, Universidad o Empresa"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="taller-contacto">Persona de contacto *</label>
                <input
                  v-model="formulario.contacto"
                  class="form-control"
                  id="taller-contacto"
                  name="contacto"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  autocomplete="name"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="taller-correo">Correo electrónico de contacto *</label>
                <input
                  v-model="formulario.correo"
                  class="form-control"
                  id="taller-correo"
                  name="correo"
                  type="email"
                  placeholder="contacto@institucion.edu.co"
                  autocomplete="email"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="taller-telefono">Teléfono celular *</label>
                <input
                  v-model="formulario.telefono"
                  class="form-control"
                  id="taller-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  autocomplete="tel"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="taller-tipo">Tipo de organización *</label>
                <select
                  v-model="formulario.tipo_organizacion"
                  class="form-select"
                  id="taller-tipo"
                  name="tipo_organizacion"
                  required
                >
                  <option value="" disabled>Selecciona el tipo...</option>
                  <option value="colegio">Colegio o Escuela</option>
                  <option value="universidad">Universidad o Instituto técnico</option>
                  <option value="empresa">Empresa privada</option>
                  <option value="publica">Entidad pública o Alcaldía</option>
                  <option value="fundacion">Fundación u Organización social</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="taller-participantes">Participantes estimados *</label>
                <select
                  v-model="formulario.participantes"
                  class="form-select"
                  id="taller-participantes"
                  name="participantes"
                  required
                >
                  <option value="" disabled>Selecciona un rango...</option>
                  <option value="10-25">10 a 25 personas</option>
                  <option value="26-50">26 a 50 personas</option>
                  <option value="51-100">51 a 100 personas</option>
                  <option value="mas-100">Más de 100 personas (masivo)</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label" for="taller-detalles">
                  Objetivo del taller y fecha tentativa (opcional)
                </label>
                <textarea
                  v-model="formulario.detalles"
                  class="form-control"
                  id="taller-detalles"
                  name="detalles"
                  rows="3"
                  placeholder="Ej. Pausa activa para semana de la salud, festival de talentos..."
                ></textarea>
              </div>

              <div class="col-12 mt-4">
                <button class="btn psr-btn-flame w-100" type="submit" :disabled="enviando">
                  Solicitar propuesta pedagógica <i class="ph-bold ph-paper-plane-tilt ms-1" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
