<template>
  <footer class="psr-footer">
    <div class="container psr-footer-bar">
      <div>
        <p class="psr-footer-brand">PSR</p>
        <p class="psr-footer-name">Pioneros de la Salsa y Ritmos</p>
        <p class="psr-footer-copy">© 2026 · Todos los derechos reservados.</p>
      </div>

      <div class="psr-social">
        <a
          class="psr-social-link"
          href="https://www.instagram.com/psrpionerosdelasalsayritmos/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src="/img/icons/instagram.svg" alt="" width="28" height="28">
        </a>
        <a
          class="psr-social-link"
          href="https://www.facebook.com/p/Escuela-de-baile-pioneros-de-la-salsa-y-ritmos-100051879342356/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <img src="/img/icons/facebook.svg" alt="" width="28" height="28">
        </a>
        <RouterLink
          class="psr-social-link"
          to="/red-no-disponible"
          aria-label="TikTok"
        >
          <img src="/img/icons/tiktok.svg" alt="" width="28" height="28">
        </RouterLink>
      </div>

      <p class="psr-footer-motto">Baila, conecta, evoluciona.</p>
    </div>
  </footer>

  <RouterLink
    class="psr-fab"
    to="/contacto#formulario"
    aria-label="Déjanos tus datos y te contactamos"
  >
    <i class="ph-fill ph-envelope-simple" aria-hidden="true"></i>
  </RouterLink>
</template>
