<script setup>
import { computed } from "vue";

const props = defineProps({
  respuestaServidor: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(["reiniciar"]);

const detalleId = computed(function () {
  if (!props.respuestaServidor) {
    return "";
  }
  const id = props.respuestaServidor.messageId || props.respuestaServidor.id;
  return id ? " · ID de envío: " + id : "";
});
</script>

<template>
  <div class="psr-confirm-box flex-column align-items-start mt-3">
    <div class="d-flex align-items-center gap-3">
      <i class="ph-fill ph-check-circle" aria-hidden="true"></i>
      <div>
        <p class="psr-confirm-title">¡Solicitud enviada con éxito! (HTTP 200/201)</p>
        <p class="small text-muted">
          El servidor recibió tu solicitud correctamente{{ detalleId }}.
        </p>
      </div>
    </div>
    <button
      type="button"
      class="btn psr-btn-soft btn-sm mt-3"
      @click="emit('reiniciar')"
    >
      Enviar otra solicitud
    </button>
  </div>
</template>
