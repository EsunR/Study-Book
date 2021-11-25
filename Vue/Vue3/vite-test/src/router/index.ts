import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { routerConfig } from "./routerConfig";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routerConfig,
});

export default router;
