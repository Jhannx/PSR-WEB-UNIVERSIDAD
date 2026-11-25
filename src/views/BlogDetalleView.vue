<script setup>
import { computed } from "vue";
import { articulosBlog } from "../data/contenidosPsr.js";
import PsrMediaCard from "../components/PsrMediaCard.vue";

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

const indiceActual = computed(function () {
  return articulosBlog.findIndex(function (art) {
    return art.slug === props.slug;
  });
});

const articulo = computed(function () {
  if (indiceActual.value === -1) {
    return null;
  }
  return articulosBlog[indiceActual.value];
});

const articuloAnterior = computed(function () {
  if (indiceActual.value <= 0) {
    return null;
  }
  return articulosBlog[indiceActual.value - 1];
});

const articuloSiguiente = computed(function () {
  if (indiceActual.value === -1 || indiceActual.value >= articulosBlog.length - 1) {
    return null;
  }
  return articulosBlog[indiceActual.value + 1];
});
</script>

<template>
  <article v-if="articulo" class="psr-section" aria-labelledby="detalle-blog-titulo">
    <div class="container">
      <!-- Enlace de regreso -->
      <div class="mb-4">
        <RouterLink class="psr-card-link" to="/blog">
          <i class="ph-bold ph-arrow-left" aria-hidden="true"></i> Volver a todas las publicaciones
        </RouterLink>
      </div>

      <div class="row justify-content-center">
        <div class="col-12 col-lg-9">
          <!-- Cabecera del articulo -->
          <header class="mb-4">
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="psr-badge" :class="articulo.tipoBadge">
                {{ articulo.categoria }}
              </span>
              <time class="small text-muted" :datetime="articulo.fechaIso">
                {{ articulo.fechaTexto }}
              </time>
            </div>
            <h1 class="psr-title-xl mb-3" id="detalle-blog-titulo">
              {{ articulo.titulo }}
            </h1>
            <p class="psr-lead text-muted">
              {{ articulo.subtitulo }}
            </p>
          </header>

          <!-- Imagen principal -->
          <figure class="mb-5">
            <img
              class="img-fluid rounded-4 shadow w-100"
              :src="articulo.imagen"
              :alt="articulo.alt"
            >
            <figcaption class="small text-muted text-center mt-2">
              {{ articulo.pieImagen }}
            </figcaption>
          </figure>

          <!-- Cuerpo del articulo -->
          <div class="content-body text-dark">
            <p>{{ articulo.introduccion }}</p>

            <div
              v-for="seccion in articulo.secciones"
              :key="seccion.subtitulo"
            >
              <h2 class="h3 mt-4 mb-3">{{ seccion.subtitulo }}</h2>
              <p
                v-for="(parrafo, idx) in seccion.parrafos"
                :key="idx"
              >
                {{ parrafo }}
              </p>
              <ul v-if="seccion.lista" class="mb-4">
                <li
                  v-for="(itemLista, idxLista) in seccion.lista"
                  :key="idxLista"
                  class="mb-2"
                >
                  {{ itemLista }}
                </li>
              </ul>
            </div>

            <blockquote class="p-3 my-4 border-start border-4 border-warning bg-light rounded-end">
              <p class="mb-0 fst-italic">
                "{{ articulo.cita }}"
              </p>
            </blockquote>

            <section
              v-if="articulo.galeria"
              class="mt-5"
              :id="articulo.galeria.id"
              :aria-labelledby="articulo.galeria.id + '-titulo'"
            >
              <p class="psr-eyebrow">{{ articulo.galeria.eyebrow }}</p>
              <h2 class="h3 mb-3" :id="articulo.galeria.id + '-titulo'">
                {{ articulo.galeria.titulo }}
              </h2>
              <p class="text-muted mb-4">{{ articulo.galeria.descripcion }}</p>
              <div class="row g-4">
                <div
                  v-for="media in articulo.galeria.items"
                  :key="media.id"
                  class="col-12 col-md-6"
                >
                  <PsrMediaCard :item="media" />
                </div>
              </div>
            </section>

            <div class="p-4 rounded-4 bg-light border my-5 text-center">
              <h3 class="h4 mb-2">{{ articulo.ctaTitulo }}</h3>
              <p class="text-muted small mb-3">{{ articulo.ctaDescripcion }}</p>
              <RouterLink class="btn psr-btn-flame" :to="articulo.ctaRuta">
                {{ articulo.ctaTexto }} <i class="ph-bold ph-arrow-right ms-1" aria-hidden="true"></i>
              </RouterLink>
            </div>
          </div>

          <!-- Navegacion entre articulos -->
          <nav
            class="border-top pt-4 d-flex justify-content-between align-items-center"
            aria-label="Navegación entre artículos"
          >
            <RouterLink
              v-if="articuloAnterior"
              class="psr-card-link"
              :to="'/blog/' + articuloAnterior.slug"
            >
              <i class="ph-bold ph-arrow-left me-1" aria-hidden="true"></i>
              Anterior: {{ articuloAnterior.categoria }}
            </RouterLink>
            <RouterLink v-else class="psr-card-link" to="/blog">
              <i class="ph-bold ph-squares-four me-1" aria-hidden="true"></i> Índice del blog
            </RouterLink>

            <RouterLink
              v-if="articuloSiguiente"
              class="psr-card-link"
              :to="'/blog/' + articuloSiguiente.slug"
            >
              Siguiente: {{ articuloSiguiente.categoria }}
              <i class="ph-bold ph-arrow-right ms-1" aria-hidden="true"></i>
            </RouterLink>
            <RouterLink v-else class="psr-card-link" to="/blog">
              Volver al blog <i class="ph-bold ph-arrow-up-right ms-1" aria-hidden="true"></i>
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  </article>

  <section v-else class="psr-section text-center">
    <div class="container">
      <h1 class="h2 mb-3">Artículo no encontrado</h1>
      <p class="text-muted mb-4">La publicación que buscas no existe o fue movida.</p>
      <RouterLink class="btn psr-btn-flame" to="/blog">Volver al blog</RouterLink>
    </div>
  </section>
</template>
