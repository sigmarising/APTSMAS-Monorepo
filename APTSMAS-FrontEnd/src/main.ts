import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import i18n from "./languages";

createApp(App).use(store, key).use(router).use(i18n).mount("#app");
