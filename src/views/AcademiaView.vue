<script setup>
import { ref } from "vue";
import {
  beneficiosAcademia,
  momentosAcademia,
  horariosAcademia,
  faqAcademia
} from "../data/contenidosPsr.js";
import { estadoGlobal } from "../store/estadoGlobal.js";
import { enviarCorreoFormulario } from "../services/clienteHttp.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrMediaCard from "../components/PsrMediaCard.vue";
import PsrFestivosBox from "../components/PsrFestivosBox.vue";
import PsrConfirmBox from "../components/PsrConfirmBox.vue";

const ID_FORM = "form-inscripcion";
const CAMPOS_INICIALES = {
  nombre: "",
  telefono: "",
  categoria: "",
  nivel: "principiante",
  mensaje: ""
};

const formulario = estadoGlobal.obtenerBorrador(ID_FORM, CAMPOS_INICIALES);
const enviando = ref(false);
const errorHttp = ref("");
const respuestaServidor = ref(null);

function guardarCambio() {
  estadoGlobal.sincronizarBorrador(ID_FORM);
}

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

function reiniciarFormulario() {
  respuestaServidor.value = null;
  errorHttp.value = "";
}
</script>

<template>
  <!-- SECCION 1: PRESENTACION -->
  <PsrPageHero
    eyebrow="SER PARTE DE LA ACADEMIA"
    titulo="Tu talento merece una pista para crecer"
    descripcion="Formación artística, disciplina y una comunidad que baila contigo en cada paso. Clases continuas por edades en Sincelejo."
    :centrado="true"
  >
    <a class="btn psr-btn-flame" href="#inscripcion">
      Quiero inscribirme <i class="ph-bold ph-arrow-right" aria-hidden="true"></i>
    </a>
  </PsrPageHero>

  <!-- SECCION 2: BENEFICIOS DE LA FORMACION (CARDS MORADOS) -->
  <section class="psr-section" aria-labelledby="beneficios-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">FORMACIÓN INTEGRAL</p>
        <h2 class="h1" id="beneficios-titulo">¿Qué incluye ser parte de la academia?</h2>
        <p class="psr-lead text-muted mx-auto psr-measure mt-2">
          Una experiencia estructurada para dominar el ritmo, ganar seguridad corporal y pertenecer a un elenco con proyección cultural.
        </p>
      </div>

      <div class="row g-4">
        <article
          v-for="beneficio in beneficiosAcademia"
          :key="beneficio.titulo"
          class="col-12 col-md-6 col-lg-3"
        >
          <div class="psr-stat-card psr-card-featured h-100">
            <span class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold" :class="beneficio.icono"></i>
            </span>
            <h3 class="h5 mt-2">{{ beneficio.titulo }}</h3>
            <p class="small mb-0">
              {{ beneficio.descripcion }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- SECCION 2.1: VIDEOS Y EXPERIENCIAS DE LA ACADEMIA (CLOUDFLARE R2) -->
  <section class="psr-section psr-section-soft" id="momentos-academia" aria-labelledby="momentos-academia-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">FORMACIÓN Y EXPERIENCIAS</p>
        <h2 class="psr-title-xl" id="momentos-academia-titulo">La danza se vive en PSR</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Conoce cómo se expresan nuestros grupos y escucha a quienes hacen parte de la academia.
        </p>
      </div>
      <div class="row g-4">
        <div
          v-for="video in momentosAcademia"
          :key="video.id"
          class="col-12 col-lg-6"
        >
          <PsrMediaCard :item="video" />
        </div>
      </div>
    </div>
  </section>

  <!-- SECCION 3: CATEGORIAS Y HORARIOS (SECCION MORADA) -->
  <section class="psr-section psr-section-purple" id="horarios" aria-labelledby="horarios-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center">
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow psr-eyebrow-light">CATEGORÍAS POR EDAD</p>
          <h2 class="h1 text-white" id="horarios-titulo">
            Encuentra tu categoría y horario de entrenamiento
          </h2>
          <p class="psr-lead text-white-50 mt-3">
            Organizamos las clases por rangos de edad para asegurar una formación pedagógica adecuada, respetando el nivel y ritmo de cada alumno.
          </p>
          <div class="mt-4">
            <a class="btn psr-btn-flame" href="#inscripcion">Inscribirme a mi grupo</a>
          </div>
          <div class="mt-4 p-3 rounded-3 bg-white text-dark shadow-sm">
            <PsrFestivosBox />
          </div>
        </div>

        <div class="col-12 col-lg-7">
          <div class="accordion psr-accordion" id="acordeon-horarios">
            <div
              v-for="(item, index) in horariosAcademia"
              :key="item.id"
              class="accordion-item"
            >
              <h3 class="accordion-header" :id="'heading-' + item.id">
                <button
                  class="accordion-button"
                  :class="{ collapsed: index !== 0 }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapse-' + item.id"
                  :aria-expanded="index === 0 ? 'true' : 'false'"
                  :aria-controls="'collapse-' + item.id"
                >
                  {{ item.titulo }}
                </button>
              </h3>
              <div
                class="accordion-collapse collapse"
                :class="{ show: index === 0 }"
                :id="'collapse-' + item.id"
                :aria-labelledby="'heading-' + item.id"
                data-bs-parent="#acordeon-horarios"
              >
                <div class="accordion-body">
                  <p class="mb-2"><strong>Horario:</strong> {{ item.horario }}</p>
                  <p class="text-muted mb-0">
                    {{ item.descripcion }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECCION 4: PREGUNTAS FRECUENTES (FAQ) -->
  <section class="psr-section" aria-labelledby="faq-titulo">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <div class="text-center mb-5">
            <p class="psr-eyebrow">RESOLVEMOS TUS DUDAS</p>
            <h2 class="h1" id="faq-titulo">Preguntas Frecuentes</h2>
            <p class="psr-lead text-muted mt-2">
              Todo lo que necesitas tener claro sobre el funcionamiento y condiciones de la academia.
            </p>
          </div>

          <div class="accordion psr-accordion" id="acordeon-faq">
            <div
              v-for="faq in faqAcademia"
              :key="faq.id"
              class="accordion-item"
            >
              <h3 class="accordion-header" :id="'head-' + faq.id">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#body-' + faq.id"
                  aria-expanded="false"
                  :aria-controls="'body-' + faq.id"
                >
                  {{ faq.pregunta }}
                </button>
              </h3>
              <div
                class="accordion-collapse collapse"
                :id="'body-' + faq.id"
                :aria-labelledby="'head-' + faq.id"
                data-bs-parent="#acordeon-faq"
              >
                <div class="accordion-body">
                  {{ faq.respuesta }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECCION 5: FORMULARIO DE INSCRIPCION -->
  <section class="psr-section psr-section-purple" id="inscripcion" aria-labelledby="inscripcion-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center justify-content-center">
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow psr-eyebrow-light">DA EL PRIMER PASO</p>
          <h2 class="h1 text-white" id="inscripcion-titulo">Inscríbete a la Escuela de Baile PSR</h2>
          <p class="psr-lead text-white-50 mt-3">
            Diligencia tus datos y nos pondremos en contacto contigo para orientarte en la matrícula, horarios y uniforme de tu categoría.
          </p>
          <p class="text-white-50 small mt-4">
            <i class="ph-bold ph-map-pin text-warning me-1" aria-hidden="true"></i>
            Sede Centro: Calle 20 #25-39, segundo piso, Sincelejo - Sucre.
          </p>
        </div>

        <div class="col-12 col-lg-7">
          <div class="p-4 p-md-5 rounded-4 bg-white text-dark shadow">
            <h3 class="h4 mb-3 text-dark">Formulario de Inscripción</h3>

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
              id="form-inscripcion"
              @submit.prevent="procesarEnvio"
              @input="guardarCambio"
              @change="guardarCambio"
            >
              <div class="col-12 col-md-6">
                <label class="form-label" for="inscripcion-nombre">Nombre completo</label>
                <input
                  v-model="formulario.nombre"
                  class="form-control"
                  id="inscripcion-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  autocomplete="name"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="inscripcion-telefono">Teléfono celular</label>
                <input
                  v-model="formulario.telefono"
                  class="form-control"
                  id="inscripcion-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  autocomplete="tel"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="inscripcion-categoria">Categoría de interés</label>
                <select
                  v-model="formulario.categoria"
                  class="form-select"
                  id="inscripcion-categoria"
                  name="categoria"
                  required
                >
                  <option value="" disabled>Selecciona una categoría...</option>
                  <option value="preinfantil-infantil">Preinfantil e Infantil (3 a 12 años)</option>
                  <option value="juvenil">Juvenil (13 a 17 años)</option>
                  <option value="adultos">Adultos (18 años en adelante)</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="inscripcion-nivel">Nivel de baile</label>
                <select
                  v-model="formulario.nivel"
                  class="form-select"
                  id="inscripcion-nivel"
                  name="nivel"
                >
                  <option value="principiante">Principiante (desde cero)</option>
                  <option value="intermedio">Intermedio (conozco pasos básicos)</option>
                  <option value="avanzado">Avanzado (experiencia en escena)</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label" for="inscripcion-mensaje">
                  Pregunta o comentario adicional (opcional)
                </label>
                <textarea
                  v-model="formulario.mensaje"
                  class="form-control"
                  id="inscripcion-mensaje"
                  name="mensaje"
                  rows="3"
                  placeholder="¿Tienes alguna duda sobre horarios o vestuario?"
                ></textarea>
              </div>

              <div class="col-12 mt-4">
                <button class="btn psr-btn-flame w-100" type="submit" :disabled="enviando">
                  Enviar solicitud de inscripción <i class="ph-bold ph-paper-plane-tilt" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
