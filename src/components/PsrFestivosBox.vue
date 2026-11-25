<script setup>
import { onMounted } from "vue";
import { estadoGlobal } from "../store/estadoGlobal.js";

defineProps({
  mostrarTitulo: {
    type: Boolean,
    default: true
  }
});

onMounted(function () {
  estadoGlobal.cargarFestivos();
});
</script>

<template>
  <div>
    <h3 v-if="mostrarTitulo" class="h6 fw-bold mb-2">
      Próximos días festivos en Colombia
    </h3>

    <div
      v-if="estadoGlobal.festivos.cargando"
      class="psr-loader p-2 my-2 bg-light border rounded text-muted small"
    >
      Conectando con el servidor...
    </div>

    <div
      v-else-if="estadoGlobal.festivos.error"
      class="psr-http-error alert alert-danger small my-2"
    >
      {{ estadoGlobal.festivos.error }}
    </div>

    <ul
      v-else-if="estadoGlobal.festivos.lista.length > 0"
      class="list-unstyled mb-0 small"
    >
      <li
        v-for="festivo in estadoGlobal.festivos.lista"
        :key="festivo.date"
      >
        • {{ festivo.date }}: {{ festivo.localName }} (Sin clase)
      </li>
    </ul>

    <p v-else class="small text-muted mb-0">
      No hay más días festivos programados en este periodo.
    </p>
  </div>
</template>
