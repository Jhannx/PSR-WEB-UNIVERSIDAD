<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

function esRutaActiva(ruta) {
  if (ruta === "/blog") {
    return route.path.startsWith("/blog");
  }
  return route.path === ruta;
}

function cerrarMenuMovil() {
  const menuEl = document.getElementById("psr-menu");
  if (menuEl && window.bootstrap && window.bootstrap.Offcanvas) {
    const instancia = window.bootstrap.Offcanvas.getInstance(menuEl);
    if (instancia) {
      instancia.hide();
    }
  }
}
</script>

<template>
  <header class="psr-header">
    <div class="container">
      <div class="psr-header-top">
        <RouterLink class="psr-brand" to="/">
          <span class="psr-brand-logo">PSR</span>
          <span>
            <span class="psr-brand-name">Pioneros de la Salsa y Ritmos</span>
            <span class="psr-brand-tagline">Sincelejo</span>
          </span>
        </RouterLink>

        <RouterLink class="btn psr-btn-flame d-none d-lg-inline-block" to="/contacto">
          Contáctanos
        </RouterLink>

        <button
          class="psr-menu-toggle d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#psr-menu"
          aria-controls="psr-menu"
          aria-label="Abrir menú"
        >
          <i class="ph-bold ph-list" aria-hidden="true"></i>
        </button>
      </div>

      <div
        class="offcanvas-lg offcanvas-end psr-menu"
        id="psr-menu"
        tabindex="-1"
        aria-labelledby="psr-menu-title"
      >
        <div class="offcanvas-header">
          <h2 class="visually-hidden" id="psr-menu-title">Menú</h2>
          <span class="psr-brand-logo">PSR</span>
          <button
            class="btn-close btn-close-white"
            type="button"
            data-bs-dismiss="offcanvas"
            data-bs-target="#psr-menu"
            aria-label="Cerrar menú"
          ></button>
        </div>
        <div class="offcanvas-body">
          <nav class="psr-nav" aria-label="Principal">
            <RouterLink
              class="psr-nav-link"
              :class="{ active: esRutaActiva('/') }"
              :aria-current="esRutaActiva('/') ? 'page' : null"
              to="/"
              @click="cerrarMenuMovil"
            >
              Inicio
            </RouterLink>

            <div class="psr-nav-group">
              <p class="psr-nav-label">Clases</p>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/academia') }"
                :aria-current="esRutaActiva('/academia') ? 'page' : null"
                to="/academia"
                @click="cerrarMenuMovil"
              >
                Academia
              </RouterLink>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/rumba-aerobica') }"
                :aria-current="esRutaActiva('/rumba-aerobica') ? 'page' : null"
                to="/rumba-aerobica"
                @click="cerrarMenuMovil"
              >
                Rumba aeróbica
              </RouterLink>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/personalizadas') }"
                :aria-current="esRutaActiva('/personalizadas') ? 'page' : null"
                to="/personalizadas"
                @click="cerrarMenuMovil"
              >
                Personalizadas
              </RouterLink>
            </div>

            <div class="psr-nav-group">
              <p class="psr-nav-label">Servicios</p>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/contratar') }"
                :aria-current="esRutaActiva('/contratar') ? 'page' : null"
                to="/contratar"
                @click="cerrarMenuMovil"
              >
                Contratar
              </RouterLink>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/talleres') }"
                :aria-current="esRutaActiva('/talleres') ? 'page' : null"
                to="/talleres"
                @click="cerrarMenuMovil"
              >
                Talleres
              </RouterLink>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/vestuarios') }"
                :aria-current="esRutaActiva('/vestuarios') ? 'page' : null"
                to="/vestuarios"
                @click="cerrarMenuMovil"
              >
                Vestuarios
              </RouterLink>
            </div>

            <div class="psr-nav-group">
              <p class="psr-nav-label">Conócenos</p>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/nosotros') }"
                :aria-current="esRutaActiva('/nosotros') ? 'page' : null"
                to="/nosotros"
                @click="cerrarMenuMovil"
              >
                Nosotros
              </RouterLink>
              <RouterLink
                class="psr-nav-link"
                :class="{ active: esRutaActiva('/blog') }"
                :aria-current="esRutaActiva('/blog') ? 'page' : null"
                to="/blog"
                @click="cerrarMenuMovil"
              >
                Comunidad
              </RouterLink>
            </div>
          </nav>

          <RouterLink
            class="btn psr-btn-flame psr-menu-cta d-lg-none"
            to="/contacto"
            @click="cerrarMenuMovil"
          >
            Contáctanos
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
