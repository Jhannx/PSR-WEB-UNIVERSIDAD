<script setup>
import { articulosBlog, momentosBlog } from "../data/contenidosPsr.js";
import PsrPageHero from "../components/PsrPageHero.vue";
import PsrMediaCard from "../components/PsrMediaCard.vue";
</script>

<template>
  <!-- Seccion 1: Portada de Blog -->
  <PsrPageHero
    eyebrow="COMUNIDAD Y NOVEDADES"
    titulo="Noticias, Clases y Vida en PSR"
    descripcion="Entérate de las actividades recientes de la academia, fechas de presentaciones, artículos sobre técnica de baile y comunicados para nuestros estudiantes."
  />

  <!-- Seccion 2: Articulos destacados del Blog -->
  <section class="psr-section" aria-labelledby="articulos-titulo">
    <div class="container">
      <div class="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
        <div>
          <p class="psr-eyebrow">PUBLICACIONES RECIENTES</p>
          <h2 class="h2 mb-0" id="articulos-titulo">Artículos y Noticias de la Academia</h2>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <RouterLink
            v-for="art in articulosBlog"
            :key="art.slug"
            class="btn btn-sm psr-btn-soft"
            :to="'/blog/' + art.slug"
          >
            {{ art.categoria }}
          </RouterLink>
        </div>
      </div>

      <div class="row g-4">
        <div
          v-for="articulo in articulosBlog"
          :key="articulo.slug"
          class="col-12 col-md-6"
        >
          <article class="psr-card h-100">
            <img
              class="psr-card-img"
              :src="articulo.imagen"
              :alt="articulo.alt"
              width="400"
              height="220"
            >
            <div class="psr-card-body">
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="psr-badge" :class="articulo.tipoBadge">
                  {{ articulo.categoria }}
                </span>
                <time class="small text-muted" :datetime="articulo.fechaIso">
                  {{ articulo.fechaTexto }}
                </time>
              </div>
              <h3 class="psr-card-title">
                <RouterLink
                  class="text-decoration-none text-dark"
                  :to="'/blog/' + articulo.slug"
                >
                  {{ articulo.titulo }}
                </RouterLink>
              </h3>
              <p class="psr-card-text">
                {{ articulo.resumen }}
              </p>
              <RouterLink class="psr-card-link" :to="'/blog/' + articulo.slug">
                {{ articulo.textoEnlace }} <i class="ph-bold ph-arrow-right" aria-hidden="true"></i>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 2.1: Momentos PSR (Cloudflare R2) -->
  <section class="psr-section psr-section-soft" id="momentos" aria-labelledby="momentos-titulo">
    <div class="container">
      <div class="text-center mb-5">
        <p class="psr-eyebrow">FOTOS Y VIDEOS DE PSR</p>
        <h2 class="psr-title-xl" id="momentos-titulo">Momentos PSR</h2>
        <p class="psr-lead text-muted mx-auto psr-measure">
          Presentaciones, talleres, clases y experiencias de nuestra comunidad, en sus espacios correspondientes.
        </p>
      </div>
      <div class="row g-4">
        <div
          v-for="momento in momentosBlog"
          :key="momento.id"
          class="col-12 col-md-6 col-lg-3"
        >
          <PsrMediaCard :item="momento" />
        </div>
      </div>
    </div>
  </section>

  <!-- Seccion 3: Invitacion a ser parte -->
  <section class="psr-section psr-section-soft text-center" aria-labelledby="invitacion-blog-titulo">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8">
          <p class="psr-eyebrow">ÚNETE A NUESTRA FAMILIA</p>
          <h2 class="psr-title-xl mb-3" id="invitacion-blog-titulo">
            ¿Quieres Vivir la Experiencia PSR?
          </h2>
          <p class="psr-lead text-muted mb-4">
            Aceptamos alumnos durante todo el año en categorías infantiles, juveniles y de adultos. No necesitas experiencia previa para empezar.
          </p>
          <div class="d-flex flex-wrap justify-content-center gap-3">
            <RouterLink class="btn psr-btn-flame" to="/academia#inscripcion">
              Inscribirme ahora <i class="ph-bold ph-arrow-right ms-1" aria-hidden="true"></i>
            </RouterLink>
            <RouterLink class="btn psr-btn-soft" to="/contacto#formulario">
              Hacer una consulta <i class="ph-bold ph-chat-circle ms-1" aria-hidden="true"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
