<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  centrado: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <section
    class="psr-section psr-section-purple"
    :class="{ 'text-center': centrado }"
  >
    <div class="container">
      <div v-if="centrado">
        <p class="psr-eyebrow psr-eyebrow-light">{{ eyebrow }}</p>
        <h1 class="psr-title-xl text-white">{{ titulo }}</h1>
        <p class="psr-lead text-white-50 psr-measure mx-auto mt-3">
          {{ descripcion }}
        </p>
        <div v-if="$slots.default" class="mt-3">
          <slot></slot>
        </div>
      </div>

      <div v-else class="row align-items-center">
        <div class="col-12 col-lg-8">
          <p class="psr-eyebrow psr-eyebrow-light">{{ eyebrow }}</p>
          <h1 class="psr-title-xl text-white">{{ titulo }}</h1>
          <p class="psr-lead text-white-50 mt-3">
            {{ descripcion }}
          </p>
          <div v-if="$slots.default" class="d-flex flex-wrap gap-3 mt-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
