<script setup>
import { RouterView } from "vue-router";
import PsrHeader from "./components/PsrHeader.vue";
import PsrFooter from "./components/PsrFooter.vue";
</script>

<template>
  <PsrHeader />

  <main>
    <RouterView />
  </main>

  <PsrFooter />
</template>
