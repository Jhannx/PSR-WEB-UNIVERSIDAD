/* router/index.js - configuracion de rutas SPA con Vue Router */

import { createRouter, createWebHistory } from "vue-router";
import InicioView from "../views/InicioView.vue";
import AcademiaView from "../views/AcademiaView.vue";
import RumbaView from "../views/RumbaView.vue";
import PersonalizadasView from "../views/PersonalizadasView.vue";
import ContratarView from "../views/ContratarView.vue";
import TalleresView from "../views/TalleresView.vue";
import VestuariosView from "../views/VestuariosView.vue";
import NosotrosView from "../views/NosotrosView.vue";
import BlogView from "../views/BlogView.vue";
import BlogDetalleView from "../views/BlogDetalleView.vue";
import ContactoView from "../views/ContactoView.vue";
import RedNoDisponibleView from "../views/RedNoDisponibleView.vue";

const routes = [
  {
    path: "/",
    name: "inicio",
    component: InicioView,
    meta: { title: "Inicio - PSR" }
  },
  {
    path: "/academia",
    name: "academia",
    component: AcademiaView,
    meta: { title: "Academia - PSR" }
  },
  {
    path: "/rumba-aerobica",
    name: "rumba-aerobica",
    component: RumbaView,
    meta: { title: "Rumba Aeróbica - PSR" }
  },
  {
    path: "/personalizadas",
    name: "personalizadas",
    component: PersonalizadasView,
    meta: { title: "Clases Personalizadas - PSR" }
  },
  {
    path: "/contratar",
    name: "contratar",
    component: ContratarView,
    meta: { title: "Contratar Shows - PSR" }
  },
  {
    path: "/talleres",
    name: "talleres",
    component: TalleresView,
    meta: { title: "Talleres - PSR" }
  },
  {
    path: "/vestuarios",
    name: "vestuarios",
    component: VestuariosView,
    meta: { title: "Alquiler de Vestuarios - PSR" }
  },
  {
    path: "/nosotros",
    name: "nosotros",
    component: NosotrosView,
    meta: { title: "Nosotros - PSR" }
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogView,
    meta: { title: "Comunidad y Blog - PSR" }
  },
  {
    path: "/blog/:slug",
    name: "blog-detalle",
    component: BlogDetalleView,
    props: true,
    meta: { title: "Artículo del Blog - PSR" }
  },
  {
    path: "/contacto",
    name: "contacto",
    component: ContactoView,
    meta: { title: "Contacto - PSR" }
  },
  {
    path: "/red-no-disponible",
    name: "red-no-disponible",
    component: RedNoDisponibleView,
    meta: { title: "Red social no disponible - PSR" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth"
      };
    }
    return { top: 0 };
  }
});

router.afterEach(function (to) {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
});

export default router;
