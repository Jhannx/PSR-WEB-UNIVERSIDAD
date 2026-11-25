<script setup>
import { cifrasInicio, programasPrincipales } from "../data/contenidosPsr.js";
import PsrCard from "../components/PsrCard.vue";
</script>

<template>
  <!-- SECCION 1: PRESENTACION PRINCIPAL -->
  <section class="psr-section psr-section-dark psr-hero">
    <div class="container">
      <div class="row align-items-center g-4 g-lg-5">
        <div class="col-12 col-lg-7">
          <p class="psr-eyebrow">Escuela de baile en Sincelejo</p>
          <h1 class="psr-title-xl text-white">Baila, conecta y transforma tu ritmo</h1>
          <p class="psr-lead psr-measure mt-3">
            Aprende salsa, bachata, ritmos latinos y acondicionamiento físico con 16 años de experiencia formando bailarines de todas las edades en Sucre.
          </p>
          <div class="d-flex flex-wrap gap-3 mt-4">
            <RouterLink class="btn psr-btn-flame" to="/contacto">Quiero inscribirme</RouterLink>
            <a class="btn psr-btn-soft" href="#programas">Ver programas de clase</a>
          </div>
        </div>
        <div class="col-12 col-lg-5 text-center">
          <figure class="m-0">
            <img
              src="/img/grupal-1.jpeg"
              alt="Grupo de bailarines de la academia PSR en presentación"
              class="img-fluid rounded-4 shadow-sm"
              width="560"
              height="420"
            >
            <figcaption class="visually-hidden">
              Estudiantes de Pioneros de la Salsa y Ritmos en coreografía
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <!-- SECCION 2: CIFRAS Y TRAYECTORIA CONFIRMADA -->
  <section class="psr-section psr-section-soft" aria-labelledby="cifras-titulo">
    <div class="container">
      <h2 class="visually-hidden" id="cifras-titulo">Cifras y trayectoria de la academia</h2>
      <div class="row g-4 text-center">
        <article
          v-for="cifra in cifrasInicio"
          :key="cifra.titulo"
          class="col-12 col-md-4"
        >
          <div class="psr-stat-card h-100">
            <span class="psr-stat-number d-block">{{ cifra.numero }}</span>
            <h3 class="h5 mt-2">{{ cifra.titulo }}</h3>
            <p class="text-muted mb-0 small">
              {{ cifra.descripcion }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- SECCION 3: PROGRAMAS PRINCIPALES DE BAILE -->
  <section class="psr-section" id="programas" aria-labelledby="programas-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">Formación y bienestar</p>
        <h2 class="h1" id="programas-titulo">Nuestros Programas de Baile</h2>
        <p class="psr-lead text-muted mx-auto psr-measure mt-2">
          Elige el formato de clase que mejor se acomode a tus objetivos, edad y disponibilidad de tiempo.
        </p>
      </div>

      <div class="row g-4">
        <div
          v-for="programa in programasPrincipales"
          :key="programa.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <PsrCard :item="programa" />
        </div>
      </div>
    </div>
  </section>

  <!-- SECCION 4: IDENTIDAD Y VALORES (SECCION OSCURA) -->
  <section class="psr-section psr-section-dark" aria-labelledby="identidad-titulo">
    <div class="container">
      <div class="row align-items-center g-4 g-lg-5">
        <div class="col-12 col-lg-7">
          <p class="psr-eyebrow psr-eyebrow-light">Identidad PSR</p>
          <h2 class="h1 text-white" id="identidad-titulo">
            Más que pasos, formamos personas a través de la danza
          </h2>
          <p class="psr-lead text-white-50 mt-3">
            En Pioneros de la Salsa y Ritmos concebimos la danza como una herramienta de disciplina, integración y salud física en Sincelejo.
          </p>
          <ul class="list-unstyled d-flex flex-column gap-3 mt-4 text-white-50">
            <li class="d-flex align-items-start gap-2">
              <i class="ph-bold ph-check text-warning mt-1" aria-hidden="true"></i>
              <span>
                <strong class="text-white">Ambiente familiar y cercano:</strong> Grupos organizados donde cada estudiante se siente apoyado y avanza a su propio ritmo.
              </span>
            </li>
            <li class="d-flex align-items-start gap-2">
              <i class="ph-bold ph-check text-warning mt-1" aria-hidden="true"></i>
              <span>
                <strong class="text-white">Sede céntrica en Sincelejo:</strong> Calle 20 #25-39, segundo piso (sobre floristería Jaiber), en pleno corazón del Centro.
              </span>
            </li>
            <li class="d-flex align-items-start gap-2">
              <i class="ph-bold ph-check text-warning mt-1" aria-hidden="true"></i>
              <span>
                <strong class="text-white">Muestras y eventos culturales:</strong> Espacios continuos para que los estudiantes compartan lo aprendido en presentaciones reales.
              </span>
            </li>
          </ul>
          <div class="d-flex flex-wrap gap-3 mt-4">
            <RouterLink class="btn psr-btn-flame" to="/nosotros">Conoce nuestra historia</RouterLink>
            <RouterLink class="btn psr-btn-outline-light" to="/contacto">Cómo llegar a la sede</RouterLink>
          </div>
        </div>
        <div class="col-12 col-lg-5 text-center">
          <figure class="m-0">
            <img
              src="/img/festival-1.jpeg"
              alt="Bailarines de PSR en escenario durante festival de danza"
              class="img-fluid rounded-4 border border-secondary shadow"
              width="540"
              height="400"
            >
            <figcaption class="text-white-50 small mt-2">
              Presentación artística del elenco PSR en festival
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <!-- SECCION 5: LLAMADO FINAL AL CONTACTO -->
  <section class="psr-section psr-section-soft text-center" aria-labelledby="cierre-inicio-titulo">
    <div class="container">
      <div class="mx-auto psr-measure">
        <p class="psr-eyebrow">Empieza hoy mismo</p>
        <h2 class="h1" id="cierre-inicio-titulo">¿Listo para dar tu primer paso en la pista?</h2>
        <p class="psr-lead text-muted mt-3 mb-4">
          No necesitas experiencia previa ni pareja para comenzar. Acércate a nuestra sede en el centro de Sincelejo o déjanos tus datos para orientarte en el mejor horario para ti.
        </p>
        <div class="d-flex justify-content-center flex-wrap gap-3">
          <RouterLink class="btn psr-btn-flame" to="/contacto">Contactar a la academia</RouterLink>
          <RouterLink class="btn psr-btn-soft" to="/academia">Explorar todas las clases</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
