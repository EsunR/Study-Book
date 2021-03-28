import { RouteRecordRaw } from "vue-router";
import Demo01 from "@/pages/study/demo01/index.vue";
import Demo02 from "@/pages/study/demo02/index.vue";
import Demo03 from "@/pages/study/demo03/index.vue";
import Demo04 from "@/pages/study/demo04/index.vue";
import Demo05 from "@/pages/study/demo05/index.vue";
import Demo06 from "@/pages/study/demo06/index.vue";
import Demo07 from "@/pages/study/demo07/index.vue";

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
  {
    path: "/demo03",
    name: "Demo03",
    component: Demo03,
  },
  {
    path: "/demo04",
    name: "Demo04",
    component: Demo04,
  },
  {
    path: "/demo05",
    name: "Demo05",
    component: Demo05,
  },
  {
    path: "/demo06",
    name: "Demo06",
    component: Demo06,
  },
  {
    path: "/demo07",
    name: "Demo07",
    component: Demo07,
  },
];

export default studyRoutes;
