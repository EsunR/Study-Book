import '@/styles/index.scss'
import App from "./App.vue";
import axios from "axios";
import { createApp } from "vue";
import { initElementPlus } from "@/plugin/element-plus";
import router from "@/router";
import { initApm } from './plugin/apm';

const app = createApp(App);

// Plugin
initElementPlus(app);
initApm(app)

// Global Properties
app.config.globalProperties.$http = axios;

// Use
app.use(router);
app.mount("#app");
