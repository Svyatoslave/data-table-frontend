import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import { VueQueryPlugin } from "vue-query";

import "normalize.css";
import "@/styles/main.css";

import router from "@/router";
import { queryPluginOptions } from "@/lib/vue-query";
import App from "@/App.vue";

const main = () =>
  createApp(App)
    .use(createPinia())
    .use(createHead())
    .use(router)
    .use(VueQueryPlugin, queryPluginOptions)
    .mount("#app");

main();
