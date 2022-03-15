import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "@/styles/index.scss";

const app = createApp(App);

// Global Properties
app.config.globalProperties.$http = axios;

// Use
app.use(ElementPlus);
app.use(router);

app.mount("#app");
