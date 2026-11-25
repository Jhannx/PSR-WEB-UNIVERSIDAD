<script setup>
import { ref, computed } from "vue";
import { momentosRumba } from "../data/contenidosPsr.js";
import { estadoGlobal } from "../store/estadoGlobal.js";
import { enviarCorreoFormulario } from "../services/clienteHttp.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrMediaCard from "../components/PsrMediaCard.vue";
import PsrFestivosBox from "../components/PsrFestivosBox.vue";
import PsrConfirmBox from "../components/PsrConfirmBox.vue";

/* Calculadora reactiva de Rumba Aerobica con v-model */
const modalidadTarifa = ref("diario");

const diasPorModalidad = {
  diario: 1,
  semanal: 4,
  mensual: 16
};

const textosPorModalidad = {
  diario: "Por clase asistida (1 día) · Sin contratos, sin membresías ni mensualidades obligatorias.",
  semanal: "Por 4 clases asistidas (1 semana) · Sin contratos, sin membresías ni mensualidades obligatorias.",
  mensual: "Por 16 clases asistidas (1 mes) · Sin contratos, sin membresías ni mensualidades obligatorias."
};

const precioFormateado = computed(function () {
  const dias = diasPorModalidad[modalidadTarifa.value] || 1;
  const total = 4000 * dias;
  return "$" + total.toLocaleString("es-CO") + " COP";
});

const descripcionTarifa = computed(function () {
  return textosPorModalidad[modalidadTarifa.value] || textosPorModalidad.diario;
});

/* Formulario reactivo con persistencia en estadoGlobal / localStorage */
const ID_FORM = "form-rumba";
const CAMPOS_INICIALES = {
  nombre: "",
  telefono: "",
  correo: "",
  dia: "",
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
    estadoGlobal.registrarSolicitud(ID_FORM, "Registro Rumba Aeróbica", CAMPOS_INICIALES);
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
  <!-- Seccion 1: Portada de Rumba Aerobica -->
  <PsrPageHero
    eyebrow="SALUD Y RITMO"
    titulo="Rumba Aeróbica en Sincelejo"
    descripcion="Entrena tu cuerpo, quema calorías y libérate del estrés diario al ritmo de la mejor música tropical. Clases grupales dinámicas en el corazón de Sincelejo."
  >
    <a class="btn psr-btn-flame" href="#registro">
      Reservar mi cupo <i class="ph-bold ph-arrow-down ms-1" aria-hidden="true"></i>
    </a>
    <a class="btn psr-btn-outline-light" href="#horarios">
      Ver tarifa y horarios <i class="ph-bold ph-clock ms-1" aria-hidden="true"></i>
    </a>
  </PsrPageHero>

  <!-- Seccion 2: Tarifa, Horarios y Beneficios -->
  <section class="psr-section" id="horarios" aria-labelledby="tarifa-titulo">
    <div class="container">
      <div class="p-4 p-md-5 rounded-4 bg-light border text-center mb-5 shadow-sm">
        <span class="psr-badge psr-badge-orange">TARIFA CONFIRMADA</span>
        <h2 class="display-5 fw-bold text-dark mt-2 mb-2" id="tarifa-titulo">
          {{ precioFormateado }}
        </h2>
        <p class="text-muted mb-3" id="tarifa-descripcion">
          {{ descripcionTarifa }}
        </p>

        <div class="row justify-content-center mb-3">
          <div class="col-12 col-sm-8 col-md-5 col-lg-4">
            <label class="form-label small text-muted mb-1" for="selector-tarifa-rumba">
              Calcular valor según asistencia:
            </label>
            <select
              v-model="modalidadTarifa"
              class="form-select form-select-sm text-center"
              id="selector-tarifa-rumba"
              name="modalidad_tarifa"
            >
              <option value="diario">Precio diario (1 clase)</option>
              <option value="semanal">Precio semanal (4 clases)</option>
              <option value="mensual">Precio mensual (16 clases)</option>
            </select>
          </div>
        </div>

        <p class="small text-muted mt-2 mb-3">
          <i class="ph-bold ph-calendar-check text-warning me-1" aria-hidden="true"></i>
          <strong>Horarios:</strong> Lunes a jueves de 7:00 p. m. a 8:00 p. m. en la sede Centro (Calle 20 #25-39).
        </p>

        <div class="d-inline-block text-start p-3 rounded-3 bg-white border shadow-sm">
          <PsrFestivosBox />
        </div>
      </div>

      <div class="text-center mb-5">
        <p class="psr-eyebrow">BENEFICIOS DEL ENTRENAMIENTO</p>
        <h2 class="psr-title-xl">¿Por Qué Entrenar Rumba en PSR?</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Una alternativa activa y divertida al gimnasio convencional, guiada por instructores especializados.
        </p>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-heart"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Cardio y Resistencia</h3>
            <p class="small text-muted mb-0">
              Mejora tu capacidad pulmonar, activa la circulación sanguínea y tonifica brazos, piernas y abdomen al compás del merengue, la salsa y la champeta.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-sparkle"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Desconexión y Cero Estrés</h3>
            <p class="small text-muted mb-0">
              La música y el movimiento liberan endorfinas que disminuyen la fatiga mental y recargan tu estado de ánimo después de una jornada laboral pesada.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-coins"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Total Libertad de Pago</h3>
            <p class="small text-muted mb-0">
              Pagas únicamente cuando asistes. No pierdes dinero si una semana no puedes venir por trabajo o compromisos familiares.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Imagen y Ambiente del Salon -->
  <section class="psr-section psr-section-soft" aria-labelledby="ambiente-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center">
        <div class="col-12 col-lg-6">
          <figure class="mb-0">
            <img
              class="img-fluid rounded-4 shadow"
              src="/img/rumba-salon.jpg"
              alt="Grupo de personas en sesión de rumba aeróbica en salón"
            >
            <figcaption class="small text-muted text-center mt-2">
              Sesión grupal de acondicionamiento físico con baile en el salón principal.
            </figcaption>
          </figure>
        </div>

        <div class="col-12 col-lg-6">
          <p class="psr-eyebrow">AMBIENTE FAMILIAR</p>
          <h2 class="h2 mb-3" id="ambiente-titulo">Un Espacio Seguro para Entrenar</h2>
          <p class="text-muted mb-3">
            En nuestras clases de rumba no importa si nunca has bailado antes. La coreografía es intuitiva y fácil de seguir, pensada para que te muevas desde el minuto uno sin miedo al error.
          </p>
          <ul class="list-unstyled mb-0">
            <li class="d-flex align-items-start gap-2 mb-2">
              <i class="ph-bold ph-check text-warning fs-5 mt-1" aria-hidden="true"></i>
              <span class="small text-muted">
                Salón amplio con buena ventilación y piso adecuado para impacto articular.
              </span>
            </li>
            <li class="d-flex align-items-start gap-2 mb-2">
              <i class="ph-bold ph-check text-warning fs-5 mt-1" aria-hidden="true"></i>
              <span class="small text-muted">
                Música variada: salsa, bachata, merengue, porro y ritmos urbanos.
              </span>
            </li>
            <li class="d-flex align-items-start gap-2">
              <i class="ph-bold ph-check text-warning fs-5 mt-1" aria-hidden="true"></i>
              <span class="small text-muted">
                Ambiente incluyente donde asisten jóvenes, adultos y personas mayores.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3.1: Videos de Momentos de Rumba Aerobica (Cloudflare R2) -->
  <section class="psr-section" id="momentos-rumba" aria-labelledby="momentos-rumba-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">RITMO Y ENERGÍA</p>
        <h2 class="psr-title-xl" id="momentos-rumba-titulo">Momentos de Rumba Aeróbica</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Así se viven las sesiones, desde los clásicos retro hasta nuestras jornadas temáticas.
        </p>
      </div>
      <div class="row g-4">
        <div
          v-for="video in momentosRumba"
          :key="video.id"
          class="col-12 col-lg-6"
        >
          <PsrMediaCard :item="video" />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 4: Formulario de Registro -->
  <section class="psr-section psr-section-purple" id="registro" aria-labelledby="registro-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center justify-content-center">
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow psr-eyebrow-light">ÚNETE A LA CLASE</p>
          <h2 class="h1 text-white" id="registro-titulo">Asegura tu Lugar para la Próxima Sesión</h2>
          <p class="psr-lead text-white-50 mt-3">
            Regístrate para avisar a nuestro equipo de tu asistencia. Recuerda llevar ropa deportiva cómoda, calzado con suela de goma limpia y termo con agua para hidratarte.
          </p>
          <p class="text-white-50 small mt-4">
            <i class="ph-bold ph-map-pin text-warning me-1" aria-hidden="true"></i>
            Calle 20 #25-39, segundo piso, Centro, Sincelejo.
          </p>
        </div>

        <div class="col-12 col-lg-7">
          <div class="p-4 p-md-5 rounded-4 bg-white text-dark shadow">
            <h3 class="h4 mb-3 text-dark">Formulario de Registro a Rumba</h3>

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
              id="form-rumba"
              @submit.prevent="procesarEnvio"
              @input="guardarCambio"
              @change="guardarCambio"
            >
              <div class="col-12 col-md-6">
                <label class="form-label" for="rumba-nombre">Nombre completo *</label>
                <input
                  v-model="formulario.nombre"
                  class="form-control"
                  id="rumba-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  autocomplete="name"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="rumba-telefono">Teléfono celular *</label>
                <input
                  v-model="formulario.telefono"
                  class="form-control"
                  id="rumba-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  autocomplete="tel"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="rumba-correo">Correo electrónico *</label>
                <input
                  v-model="formulario.correo"
                  class="form-control"
                  id="rumba-correo"
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="rumba-dia">Día en que deseas asistir *</label>
                <select
                  v-model="formulario.dia"
                  class="form-select"
                  id="rumba-dia"
                  name="dia"
                  required
                >
                  <option value="" disabled>Selecciona el día (7:00 a 8:00 p. m.)...</option>
                  <option value="lunes">Lunes (7:00 p. m.)</option>
                  <option value="martes">Martes (7:00 p. m.)</option>
                  <option value="miercoles">Miércoles (7:00 p. m.)</option>
                  <option value="jueves">Jueves (7:00 p. m.)</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label" for="rumba-mensaje">
                  ¿Alguna recomendación o condición física? (opcional)
                </label>
                <textarea
                  v-model="formulario.mensaje"
                  class="form-control"
                  id="rumba-mensaje"
                  name="mensaje"
                  rows="2"
                  placeholder="Cuéntanos si tienes alguna molestia en rodillas, espalda o si es tu primera vez..."
                ></textarea>
              </div>

              <div class="col-12 mt-4">
                <button class="btn psr-btn-flame w-100" type="submit" :disabled="enviando">
                  Confirmar mi asistencia <i class="ph-bold ph-paper-plane-tilt ms-1" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
