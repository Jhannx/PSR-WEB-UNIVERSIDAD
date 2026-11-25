/* main.js - punto de entrada de la aplicacion Vue 3 + Vite */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "../css/styles.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
