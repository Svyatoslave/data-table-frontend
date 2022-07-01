import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import { VueQueryPlugin } from "vue-query";

import "normalize.css";
import "@/styles/main.css";

import router from "@/router";
import { queryPluginOptions } from "@/lib/vue-query";
import App from "@/App.vue";

// if (import.meta.env.DEV) {
//   const { worker } = await import("./mocks/browser");
//   worker.start();
// }

const app = createApp(App);

app.use(createPinia());
app.use(createHead());
app.use(router);
app.use(VueQueryPlugin, queryPluginOptions);

app.mount("#app");
