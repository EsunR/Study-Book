import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import StudyIndex from "@/pages/study/index.vue";
import HomePage from "@/pages/home.vue";
import studyRoutes from "./study";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/study",
    name: "studyIndex",
    component: StudyIndex,
    children: studyRoutes,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
