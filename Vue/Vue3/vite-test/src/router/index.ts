import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "home",
    component: Home,
    path: "/home",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
