<script setup>
import { ref } from "vue";

defineProps({
  item: {
    type: Object,
    required: true
  }
});

const videoRef = ref(null);
const reproduciendo = ref(false);

function reproducirVideo() {
  const video = videoRef.value;
  if (!video) {
    return;
  }
  const promesa = video.play();
  if (promesa && typeof promesa.catch === "function") {
    promesa.catch(function () {
      video.controls = true;
    });
  }
}
</script>

<template>
  <figure
    v-if="item.esFigura"
    class="psr-card h-100 overflow-hidden"
  >
    <img
      class="psr-card-img"
      :src="item.url"
      :alt="item.alt"
      loading="lazy"
    >
    <figcaption class="psr-card-body small text-muted">
      {{ item.descripcion }}
    </figcaption>
  </figure>

  <article v-else class="psr-card h-100 overflow-hidden">
    <div
      v-if="item.tipo === 'video'"
      class="psr-video-frame"
      :class="{ 'is-playing': reproduciendo }"
    >
      <video
        ref="videoRef"
        class="psr-media-video"
        controls
        preload="metadata"
        playsinline
        :aria-label="item.ariaLabel || item.titulo"
        @play="reproduciendo = true"
        @pause="reproduciendo = false"
        @ended="reproduciendo = false"
      >
        <source :src="item.url" type="video/mp4">
        Tu navegador no puede reproducir este video.
      </video>
      <button
        class="psr-video-play"
        type="button"
        :aria-label="'Reproducir video: ' + (item.ariaLabel || item.titulo)"
        @click="reproducirVideo"
      >
        <span class="psr-video-play-icon" aria-hidden="true"></span>
        <span class="psr-video-play-label" aria-hidden="true">Reproducir video</span>
      </button>
    </div>

    <img
      v-else
      class="psr-card-img"
      :src="item.url"
      :alt="item.alt || item.titulo"
      loading="lazy"
    >

    <div class="psr-card-body">
      <span
        v-if="item.badge"
        class="psr-badge"
        :class="item.tipoBadge"
      >
        {{ item.badge }}
      </span>
      <h3 class="psr-card-title">{{ item.titulo }}</h3>
      <p v-if="item.descripcion" class="psr-card-text">
        {{ item.descripcion }}
      </p>
      <RouterLink
        v-if="item.ruta"
        class="psr-card-link"
        :to="item.ruta"
      >
        {{ item.textoEnlace }} <i class="ph-bold ph-arrow-right" aria-hidden="true"></i>
      </RouterLink>
    </div>
  </article>
</template>
