<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  textoBotonSeleccion: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["seleccionar"]);
</script>

<template>
  <article class="psr-card h-100">
    <img
      class="psr-card-img"
      :src="item.imagen"
      :alt="item.alt || item.titulo"
      width="400"
      height="220"
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

      <p class="psr-card-text">
        {{ item.descripcion }}
      </p>

      <p v-if="item.metaEtiqueta" class="small text-muted mb-2">
        <strong>{{ item.metaEtiqueta }}</strong> {{ item.metaValor }}
      </p>

      <RouterLink
        v-if="item.ruta"
        class="psr-card-link mt-auto"
        :to="item.ruta"
      >
        {{ item.textoEnlace }} <i class="ph-bold ph-arrow-right" aria-hidden="true"></i>
      </RouterLink>

      <button
        v-else-if="textoBotonSeleccion"
        type="button"
        class="btn psr-btn-soft btn-sm mt-2 align-self-start"
        @click="emit('seleccionar', item)"
      >
        {{ textoBotonSeleccion }} <i class="ph-bold ph-arrow-down ms-1" aria-hidden="true"></i>
      </button>
    </div>
  </article>
</template>
