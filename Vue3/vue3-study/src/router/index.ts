import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Demo01 from "../views/Demo01.vue";
import Demo02 from "../views/Demo02.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/demo01",
    name: "Demo01",
    component: Demo01,
  },
  {
    path: "/demo02",
    name: "Demo02",
    component: Demo02,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
