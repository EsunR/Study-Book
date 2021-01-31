import { RouteRecordRaw } from "vue-router";
import Demo01 from "@/pages/study/demo01/index.vue";
import Demo02 from "@/pages/study/demo02/index.vue";

const studyRoutes: Array<RouteRecordRaw> = [
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

export default studyRoutes;
