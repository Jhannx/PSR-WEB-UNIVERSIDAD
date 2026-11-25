<script setup>
import { ref } from "vue";
import { estadoGlobal } from "../store/estadoGlobal.js";
import { enviarCorreoFormulario } from "../services/clienteHttp.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrFestivosBox from "../components/PsrFestivosBox.vue";
import PsrConfirmBox from "../components/PsrConfirmBox.vue";

const ID_FORM = "form-contacto";
const CAMPOS_INICIALES = {
  nombre: "",
  correo: "",
  telefono: "",
  motivo: "",
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
    estadoGlobal.registrarSolicitud(ID_FORM, "Contacto General", CAMPOS_INICIALES);
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
  <!-- Seccion 1: Portada de contacto -->
  <PsrPageHero
    eyebrow="ATENCIÓN Y ORIENTACIÓN"
    titulo="Contacto y Ubicación de Nuestra Sede"
    descripcion="Visítanos en el Centro de Sincelejo o escríbenos a través del formulario para recibir asesoría sobre inscripciones, horarios de clase y servicios para eventos."
  />

  <!-- Seccion 2: Informacion de sede y Formulario -->
  <section class="psr-section" id="formulario" aria-labelledby="formulario-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5">
        <!-- Columna izquierda: Datos de la sede y mapa -->
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow">SEDE PRINCIPAL</p>
          <h2 class="h2 mb-4" id="sede-titulo">Dónde Encontrarnos</h2>

          <address class="fst-normal mb-4">
            <!-- Direccion fisica -->
            <div class="d-flex align-items-start gap-3 mb-3">
              <div class="psr-card-icon flex-shrink-0" aria-hidden="true">
                <i class="ph-bold ph-map-pin"></i>
              </div>
              <div>
                <h3 class="h6 mb-1 text-dark fw-bold">Dirección física</h3>
                <p class="mb-0 text-muted">
                  Calle 20 #25-39, Segundo piso (sobre floristería Jaiber), Centro, Sincelejo - Sucre.
                </p>
              </div>
            </div>

            <!-- Horarios de atencion -->
            <div class="d-flex align-items-start gap-3 mb-3">
              <div class="psr-card-icon flex-shrink-0" aria-hidden="true">
                <i class="ph-bold ph-clock"></i>
              </div>
              <div>
                <h3 class="h6 mb-1 text-dark fw-bold">Horarios de atención de la sede</h3>
                <p class="mb-1 text-muted">Lunes a viernes: 4:00 p. m. a 10:00 p. m.</p>
                <p class="mb-2 text-muted">Sábados: 8:00 a. m. a 12:00 m. y 2:00 p. m. a 6:00 p. m.</p>
                <div class="mt-2 pt-2 border-top">
                  <PsrFestivosBox :mostrar-titulo="false" />
                </div>
              </div>
            </div>

            <!-- Correo electronico -->
            <div class="d-flex align-items-start gap-3 mb-3">
              <div class="psr-card-icon flex-shrink-0" aria-hidden="true">
                <i class="ph-bold ph-envelope-simple"></i>
              </div>
              <div>
                <h3 class="h6 mb-1 text-dark fw-bold">Correo electrónico</h3>
                <a class="psr-card-link" href="mailto:escuelapsr@gmail.com">escuelapsr@gmail.com</a>
              </div>
            </div>

            <!-- Instagram -->
            <div class="d-flex align-items-start gap-3 mb-3">
              <div class="psr-card-icon flex-shrink-0" aria-hidden="true">
                <i class="ph-bold ph-instagram-logo"></i>
              </div>
              <div>
                <h3 class="h6 mb-1 text-dark fw-bold">Instagram de la academia</h3>
                <a
                  class="psr-card-link"
                  href="https://www.instagram.com/psrpionerosdelasalsayritmos/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @psrpionerosdelasalsayritmos
                </a>
              </div>
            </div>

            <!-- Facebook -->
            <div class="d-flex align-items-start gap-3">
              <div class="psr-card-icon flex-shrink-0" aria-hidden="true">
                <i class="ph-bold ph-facebook-logo"></i>
              </div>
              <div>
                <h3 class="h6 mb-1 text-dark fw-bold">Facebook de la academia</h3>
                <a
                  class="psr-card-link"
                  href="https://www.facebook.com/p/Escuela-de-baile-pioneros-de-la-salsa-y-ritmos-100051879342356/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escuela de baile Pioneros de la Salsa y Ritmos
                </a>
              </div>
            </div>
          </address>

          <!-- Mapa / Ubicacion Google Maps -->
          <div class="p-3 bg-light rounded-4 border">
            <h3 class="h6 fw-bold mb-2">Ubicación en Google Maps</h3>
            <p class="small text-muted mb-3">
              Nuestra escuela se encuentra en una zona de fácil acceso en el centro de la ciudad.
            </p>
            <a
              class="btn psr-btn-soft w-100"
              href="https://www.google.com/maps/place/Escuela+De+Baile+Pioneros+De+La+Salsa+Y+Ritmos+PSR/@9.3049336,-75.3901811,19.63z/data=!4m6!3m5!1s0x8e5915a0f7422d4f:0x3d546f46996a99a5!8m2!3d9.3049677!4d-75.3903142!16s%2Fg%2F11g1lvxkw5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir ubicación en Google Maps <i class="ph-bold ph-arrow-square-out ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Columna derecha: Formulario General -->
        <div class="col-12 col-lg-7">
          <div class="p-4 p-md-5 rounded-4 bg-white border shadow-sm">
            <h2 class="h3 mb-2" id="formulario-titulo">Escríbenos tu Consulta</h2>
            <p class="text-muted mb-4 small">
              Todos los campos marcados con asterisco (*) son obligatorios. Te responderemos al correo a la mayor brevedad.
            </p>

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
              id="form-contacto"
              @submit.prevent="procesarEnvio"
              @input="guardarCambio"
              @change="guardarCambio"
            >
              <div class="col-12 col-md-6">
                <label class="form-label" for="contacto-nombre">Nombre completo *</label>
                <input
                  v-model="formulario.nombre"
                  class="form-control"
                  id="contacto-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  autocomplete="name"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contacto-correo">Correo electrónico *</label>
                <input
                  v-model="formulario.correo"
                  class="form-control"
                  id="contacto-correo"
                  name="correo"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  autocomplete="email"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contacto-telefono">Teléfono celular *</label>
                <input
                  v-model="formulario.telefono"
                  class="form-control"
                  id="contacto-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  autocomplete="tel"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="contacto-motivo">Motivo de contacto *</label>
                <select
                  v-model="formulario.motivo"
                  class="form-select"
                  id="contacto-motivo"
                  name="motivo"
                  required
                >
                  <option value="" disabled>Selecciona una opción...</option>
                  <option value="academia">Inscripción en Academia regular</option>
                  <option value="rumba">Clases de Rumba aeróbica</option>
                  <option value="personalizadas">Clases personalizadas (Salsa, Bachata, Champeta)</option>
                  <option value="contratar">Cotización de shows para eventos</option>
                  <option value="talleres">Talleres de danza para instituciones</option>
                  <option value="vestuarios">Alquiler de trajes y vestuarios</option>
                  <option value="otro">Otra consulta o duda general</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label" for="contacto-mensaje">Tu mensaje o pregunta *</label>
                <textarea
                  v-model="formulario.mensaje"
                  class="form-control"
                  id="contacto-mensaje"
                  name="mensaje"
                  rows="4"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  minlength="10"
                  required
                ></textarea>
              </div>

              <div class="col-12 mt-4">
                <button class="btn psr-btn-flame w-100" type="submit" :disabled="enviando">
                  Enviar mensaje <i class="ph-bold ph-paper-plane-tilt ms-1" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Dudas frecuentes de atencion -->
  <section class="psr-section psr-section-soft" aria-labelledby="ayuda-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">CANALES DE COMUNICACIÓN</p>
        <h2 class="psr-title-xl" id="ayuda-titulo">Preguntas Sobre Nuestra Atención</h2>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <h3 class="h5 fw-bold mb-2">¿Por qué no hay WhatsApp visible?</h3>
            <p class="small text-muted mb-0">
              Para brindar un seguimiento adecuado a cada solicitud, centralizamos las consultas a través de nuestros formularios y correo electrónico.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <h3 class="h5 fw-bold mb-2">¿Puedo visitar la sede sin cita previa?</h3>
            <p class="small text-muted mb-0">
              Sí. Puedes acercarte directamente dentro de los horarios de atención de lunes a sábado para conocer el salón y hablar con el equipo.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <h3 class="h5 fw-bold mb-2">¿En cuánto tiempo responden?</h3>
            <p class="small text-muted mb-0">
              Revisamos las solicitudes diariamente y solemos responder los correos en un plazo promedio de 24 horas hábiles.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
