import axios from "axios";
import "element-plus/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";

const app = createApp(App);

// Global Properties
app.config.globalProperties.$http = axios;

// Use
app.use(ElementPlus);
app.use(router);

app.mount("#app");
