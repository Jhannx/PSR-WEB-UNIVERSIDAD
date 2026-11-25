<script setup>
import { ref } from "vue";
import { ritmosPersonalizadas } from "../data/contenidosPsr.js";
import { estadoGlobal } from "../store/estadoGlobal.js";
import { enviarCorreoFormulario } from "../services/clienteHttp.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrCard from "../components/PsrCard.vue";
import PsrFestivosBox from "../components/PsrFestivosBox.vue";
import PsrConfirmBox from "../components/PsrConfirmBox.vue";

const ID_FORM = "form-personalizadas";
const CAMPOS_INICIALES = {
  nombre: "",
  telefono: "",
  correo: "",
  ritmo: "",
  modalidad: "",
  horario: "",
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
function elegirRitmoDesdeTarjeta(item) {
  formulario.ritmo = item.valorSelect;
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
    estadoGlobal.registrarSolicitud(ID_FORM, "Clase Personalizada", CAMPOS_INICIALES);
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
  <!-- Seccion 1: Portada de Clases Personalizadas -->
  <PsrPageHero
    eyebrow="ATENCIÓN EXCLUSIVA"
    titulo="Clases Personalizadas de Baile"
    descripcion="Aprende a tu propio ritmo, sin la presión de un grupo y con la atención total de un profesor. Especialistas en Salsa, Bachata y Champeta en modalidad individual o en pareja."
  >
    <a class="btn psr-btn-flame" href="#solicitud">
      Agendar mi clase <i class="ph-bold ph-arrow-down ms-1" aria-hidden="true"></i>
    </a>
    <a class="btn psr-btn-outline-light" href="#ritmos">
      Ver ritmos disponibles <i class="ph-bold ph-music-notes ms-1" aria-hidden="true"></i>
    </a>
  </PsrPageHero>

  <!-- Seccion 2: Los 3 Ritmos Principales -->
  <section class="psr-section" id="ritmos" aria-labelledby="ritmos-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">BAILE SOCIAL Y DE FIESTA</p>
        <h2 class="psr-title-xl" id="ritmos-titulo">Ritmos que Puedes Aprender</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Diseñamos el plan de clase según tu nivel actual: desde marcar tu primer paso básico hasta preparar coreografías especiales.
        </p>
      </div>

      <div class="row g-4">
        <div
          v-for="ritmo in ritmosPersonalizadas"
          :key="ritmo.id"
          class="col-12 col-md-4"
        >
          <PsrCard
            :item="ritmo"
            texto-boton-seleccion="Elegir este ritmo"
            @seleccionar="elegirRitmoDesdeTarjeta"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Modalidades y Ventajas -->
  <section class="psr-section psr-section-soft" aria-labelledby="modalidades-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">METODOLOGÍA PRIVADA</p>
        <h2 class="psr-title-xl" id="modalidades-titulo">¿Cómo Funcionan las Clases Particulares?</h2>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-calendar"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Horarios a tu Medida</h3>
            <p class="small text-muted mb-0">
              Coordinamos las sesiones en horarios de mañana, tarde o noche según tu disponibilidad laboral o académica.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-user-check"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Individual o en Pareja</h3>
            <p class="small text-muted mb-0">
              Puedes tomar la clase de forma individual con el profesor o venir en pareja para preparar un baile especial de boda o aniversario.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-speedometer"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Progreso Rápido</h3>
            <p class="small text-muted mb-0">
              Al tener corrección constante e inmediata de postura y conteo, avanzas hasta tres veces más rápido que en una clase grupal.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 4: Formulario de Solicitud -->
  <section class="psr-section psr-section-purple" id="solicitud" aria-labelledby="formulario-privadas-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center justify-content-center">
        <div class="col-12 col-lg-5">
          <p class="psr-eyebrow psr-eyebrow-light">AGENDA PERSONALIZADA</p>
          <h2 class="h1 text-white" id="formulario-privadas-titulo">Solicita tu Clase Particular</h2>
          <p class="psr-lead text-white-50 mt-3">
            Indícanos qué ritmo te interesa aprender y tu disponibilidad de tiempo. Te responderemos para asignar al profesor especialista y confirmar tu fecha de inicio.
          </p>
          <div class="d-flex align-items-start gap-3 mt-4 text-white-50 small">
            <i class="ph-bold ph-map-pin text-warning fs-4 flex-shrink-0" aria-hidden="true"></i>
            <p class="mb-0">
              Las clases se dictan en nuestra sede Centro: Calle 20 #25-39, segundo piso, Sincelejo.
            </p>
          </div>
          <div class="mt-4 p-3 rounded-3 bg-white text-dark shadow-sm">
            <PsrFestivosBox />
          </div>
        </div>

        <div class="col-12 col-lg-7">
          <div class="p-4 p-md-5 rounded-4 bg-white text-dark shadow">
            <h3 class="h4 mb-3 text-dark">Formulario de Clase Personalizada</h3>

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
              id="form-personalizadas"
              @submit.prevent="procesarEnvio"
              @input="guardarCambio"
              @change="guardarCambio"
            >
              <div class="col-12 col-md-6">
                <label class="form-label" for="privada-nombre">Nombre completo *</label>
                <input
                  v-model="formulario.nombre"
                  class="form-control"
                  id="privada-nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  autocomplete="name"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="privada-telefono">Teléfono celular *</label>
                <input
                  v-model="formulario.telefono"
                  class="form-control"
                  id="privada-telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 300 123 4567"
                  autocomplete="tel"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="privada-correo">Correo electrónico *</label>
                <input
                  v-model="formulario.correo"
                  class="form-control"
                  id="privada-correo"
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  autocomplete="email"
                  required
                >
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="privada-ritmo">Ritmo de interés *</label>
                <select
                  v-model="formulario.ritmo"
                  class="form-select"
                  id="privada-ritmo"
                  name="ritmo"
                  required
                >
                  <option value="" disabled>Selecciona un ritmo...</option>
                  <option value="salsa">Salsa (Línea o Estilo Libre)</option>
                  <option value="bachata">Bachata (Sensual o Tradicional)</option>
                  <option value="champeta">Champeta y Ritmos Caribe</option>
                  <option value="variado">Baile Social Variado (Salsa + Bachata)</option>
                  <option value="boda">Vals o Baile Nupcial para Boda</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="privada-modalidad">Modalidad de clase *</label>
                <select
                  v-model="formulario.modalidad"
                  class="form-select"
                  id="privada-modalidad"
                  name="modalidad"
                  required
                >
                  <option value="" disabled>Selecciona la modalidad...</option>
                  <option value="individual">Individual (1 persona con profesor)</option>
                  <option value="pareja">En Pareja (2 personas con profesor)</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label" for="privada-horario">Franja horaria disponible *</label>
                <select
                  v-model="formulario.horario"
                  class="form-select"
                  id="privada-horario"
                  name="horario"
                  required
                >
                  <option value="" disabled>Selecciona un horario...</option>
                  <option value="manana">Mañanas (8:00 a. m. a 12:00 m.)</option>
                  <option value="tarde">Tardes (2:00 p. m. a 6:00 p. m.)</option>
                  <option value="noche">Noches (6:00 p. m. a 9:00 p. m.)</option>
                  <option value="sabados">Sábados</option>
                </select>
              </div>

              <div class="col-12">
                <label class="form-label" for="privada-detalles">
                  ¿Cuál es tu objetivo o experiencia previa? (opcional)
                </label>
                <textarea
                  v-model="formulario.detalles"
                  class="form-control"
                  id="privada-detalles"
                  name="detalles"
                  rows="3"
                  placeholder="Ej. Quiero aprender desde cero para una fiesta, o quiero perfeccionar giros..."
                ></textarea>
              </div>

              <div class="col-12 mt-4">
                <button class="btn psr-btn-flame w-100" type="submit" :disabled="enviando">
                  Solicitar asignación de clase <i class="ph-bold ph-paper-plane-tilt ms-1" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
