<template>
  <section class="psr-section psr-section-soft text-center" aria-labelledby="red-no-disponible-titulo">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="p-4 p-md-5 rounded-4 bg-white border shadow-sm">
            <div class="psr-card-icon mx-auto mb-3" aria-hidden="true">
              <i class="ph-bold ph-warning-circle"></i>
            </div>
            <span class="psr-badge psr-badge-orange">AVISO DE COMUNIDAD</span>
            <h1 class="h2 mt-2 mb-3" id="red-no-disponible-titulo">
              Red social no disponible temporalmente
            </h1>
            <p class="text-muted mb-4">
              Por el momento la Escuela de Baile <strong>Pioneros de la Salsa y Ritmos (PSR)</strong> no cuenta con un canal activo en TikTok. Puedes seguir nuestras clases, eventos y presentaciones a través de nuestras redes oficiales o escribirnos directamente.
            </p>

            <div class="d-flex flex-wrap justify-content-center gap-3 mb-3">
              <a
                class="btn psr-btn-flame"
                href="https://www.instagram.com/psrpionerosdelasalsayritmos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir a Instagram <i class="ph-bold ph-instagram-logo ms-1" aria-hidden="true"></i>
              </a>
              <a
                class="btn psr-btn-soft"
                href="https://www.facebook.com/p/Escuela-de-baile-pioneros-de-la-salsa-y-ritmos-100051879342356/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir a Facebook <i class="ph-bold ph-facebook-logo ms-1" aria-hidden="true"></i>
              </a>
            </div>

            <div class="pt-3 border-top">
              <RouterLink class="psr-card-link" to="/">
                <i class="ph-bold ph-arrow-left" aria-hidden="true"></i> Volver al inicio
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
