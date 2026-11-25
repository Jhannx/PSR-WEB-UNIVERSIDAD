<script setup>
import { profesoresNosotros, fotoProfesoresNosotros } from "../data/contenidosPsr.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrCard from "../components/PsrCard.vue";
</script>

<template>
  <!-- Seccion 1: Portada de Nosotros -->
  <PsrPageHero
    eyebrow="16 AÑOS DE TRAYECTORIA"
    titulo="Pasión, Ritmo y Formación en Danza"
    descripcion="Conoce la historia, el equipo docente y la misión cultural de la Escuela de Baile Pioneros de la Salsa y Ritmos (PSR) en Sincelejo."
  />

  <!-- Seccion 2: Historia y Mision -->
  <section class="psr-section" aria-labelledby="historia-titulo">
    <div class="container">
      <div class="row g-4 g-lg-5 align-items-center">
        <div class="col-12 col-lg-6">
          <p class="psr-eyebrow">NUESTRA TRAYECTORIA</p>
          <h2 class="h2 mb-4" id="historia-titulo">16 Años Construyendo Danza en Sincelejo</h2>
          <p class="text-muted mb-3">
            La Escuela de Baile <strong>Pioneros de la Salsa y Ritmos (PSR)</strong> nació en el año 2010 con un propósito fundamental: brindar a la comunidad sincelejana un espacio formativo integral donde niños, jóvenes y adultos pudieran aprender a bailar con técnica, disciplina y alegría.
          </p>
          <p class="text-muted mb-4">
            A lo largo de 16 años de trabajo continuo, PSR ha formado generaciones de bailarines que hoy brillan en festivales, competencias regionales y muestras culturales, manteniendo vivas las raíces de la salsa y los ritmos tropicales en el departamento de Sucre.
          </p>

          <ul class="list-unstyled mb-0">
            <li class="d-flex align-items-start gap-3 mb-3">
              <i class="ph-bold ph-check-circle text-warning fs-5 flex-shrink-0 mt-1" aria-hidden="true"></i>
              <div>
                <h3 class="h6 mb-1 fw-bold text-dark">Formación para todas las edades</h3>
                <p class="small text-muted mb-0">
                  Programas diseñados desde los 3 años hasta adultos sin límite de edad.
                </p>
              </div>
            </li>
            <li class="d-flex align-items-start gap-3 mb-3">
              <i class="ph-bold ph-check-circle text-warning fs-5 flex-shrink-0 mt-1" aria-hidden="true"></i>
              <div>
                <h3 class="h6 mb-1 fw-bold text-dark">Enfoque pedagógico y humano</h3>
                <p class="small text-muted mb-0">
                  Más que coreografías, enseñamos coordinación, confianza y trabajo en equipo.
                </p>
              </div>
            </li>
            <li class="d-flex align-items-start gap-3">
              <i class="ph-bold ph-check-circle text-warning fs-5 flex-shrink-0 mt-1" aria-hidden="true"></i>
              <div>
                <h3 class="h6 mb-1 fw-bold text-dark">Sede céntrica y acondicionada</h3>
                <p class="small text-muted mb-0">
                  Salón amplio en el Centro de Sincelejo con piso apto para la práctica dancística.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div class="col-12 col-lg-6">
          <figure class="mb-0">
            <img
              class="img-fluid rounded-4 shadow"
              src="/img/grupal-2.jpeg"
              alt="Bailarines de PSR en muestra coreográfica regional"
            >
            <figcaption class="small text-muted text-center mt-2">
              Presentación del elenco principal de PSR en el teatro de Sincelejo.
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Equipo Docente (6 profesores) -->
  <section class="psr-section psr-section-soft" aria-labelledby="equipo-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">CUERPO DOCENTE</p>
        <h2 class="psr-title-xl" id="equipo-titulo">Nuestros 6 Profesores de Danza</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Instructores y bailarines profesionales dedicados al desarrollo artístico, rítmico y técnico de cada grupo.
        </p>
      </div>

      <figure class="mb-5">
        <img
          class="img-fluid rounded-4 shadow w-100"
          :src="fotoProfesoresNosotros"
          alt="Equipo de profesores de la Escuela de Baile PSR"
          loading="lazy"
        >
        <figcaption class="small text-muted text-center mt-2">
          El equipo docente que acompaña la formación de nuestros grupos.
        </figcaption>
      </figure>

      <div class="row g-4">
        <div
          v-for="profesor in profesoresNosotros"
          :key="profesor.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <PsrCard :item="profesor" />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 4: Pilares y Valores de la Academia -->
  <section class="psr-section" aria-labelledby="valores-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">NUESTROS PILARES</p>
        <h2 class="psr-title-xl" id="valores-titulo">Por Qué Elegir la Escuela PSR</h2>
      </div>

      <div class="row g-4">
        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-graduation-cap"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Metodología Progresiva</h3>
            <p class="small text-muted mb-0">
              Diseñamos niveles claros para que aprendas desde cero sin presiones ni frustración, respetando tu ritmo de aprendizaje.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-heart"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Ambiente de Respeto y Familia</h3>
            <p class="small text-muted mb-0">
              Fomentamos un espacio seguro donde el compañerismo y la motivación mutua son la base de cada clase y entrenamiento.
            </p>
          </article>
        </div>

        <div class="col-12 col-md-4">
          <article class="psr-stat-card h-100">
            <div class="psr-card-icon" aria-hidden="true">
              <i class="ph-bold ph-trophy"></i>
            </div>
            <h3 class="h5 fw-bold mb-2">Oportunidades de Escena</h3>
            <p class="small text-muted mb-0">
              Los alumnos de la academia tienen la posibilidad de presentarse en festivales y eventos locales para ganar experiencia escénica.
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 5: Cierre / Invitacion -->
  <section class="psr-section psr-section-dark text-center" aria-labelledby="cierre-nosotros-titulo">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <p class="psr-eyebrow psr-eyebrow-light">FORMA PARTE DE NUESTRA HISTORIA</p>
          <h2 class="psr-title-xl text-white mb-3" id="cierre-nosotros-titulo">
            Aprende a Bailar con Nosotros
          </h2>
          <p class="psr-lead text-white-50 mb-4">
            Ya sea por diversión, acondicionamiento físico o formación profesional, en PSR encuentras un lugar para crecer a tu propio ritmo.
          </p>
          <div class="d-flex flex-wrap justify-content-center gap-3">
            <RouterLink class="btn psr-btn-flame" to="/academia#inscripcion">
              Ver programas de formación <i class="ph-bold ph-arrow-right ms-1" aria-hidden="true"></i>
            </RouterLink>
            <RouterLink class="btn psr-btn-outline-light" to="/contacto#formulario">
              Visitar la sede <i class="ph-bold ph-map-pin ms-1" aria-hidden="true"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
