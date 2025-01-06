/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "animate.css";
// Default theme
import "@splidejs/vue-splide/css";

// or other themes
import "@splidejs/vue-splide/css/skyblue";
import "@splidejs/vue-splide/css/sea-green";

// or only core styles
import "@splidejs/vue-splide/css/core";

// Plugins
import vuetify from "./vuetify";
import pinia from "../store";
import router from "../router";
import { Vue3Mq } from "vue3-mq";
import VueSmoothScroll from "vue3-smooth-scroll";
import VueApexCharts from "vue3-apexcharts";

// Types
import type { App } from "vue";

export function registerPlugins(app: App) {
  app
    .use(Vue3Mq, {
      breakpoints: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
      },
      defaultBreakpoint: "xl",
    })

    .use(vuetify)
    .use(router)
    .use(pinia)

    .use(VueSmoothScroll)
    .use(VueApexCharts);
}
