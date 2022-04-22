import { useApm } from "@/plugin/apm";
import { nextTick } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// Home
const Home = () => import("@/pages/home/index.vue");
// Demo
const DemoIndex = () => import("@/pages/demo/index.vue");
// Upload
const UploadImageIndex = () => import("@/pages/upload/image/index.vue");
const UploadLargeFileIndex = () =>
  import("@/pages/upload/large-file/index.vue");
// Performance
const PerformanceVueIndex = () => import("@/pages/performance/vue/index.vue");

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      hide: true,
    },
  },
  // home
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      menuName: "首页",
    },
  },
  // demo
  {
    path: "/demo",
    name: "demo",
    component: DemoIndex,
    meta: {
      menuName: "Demo",
    },
  },
  // upload
  {
    path: "/upload/image",
    name: "uploadImage",
    component: UploadImageIndex,
    meta: {
      belong: "上传",
      menuName: "图片上传",
    },
  },
  {
    path: "/upload/large-file",
    name: "uploadLargeFile",
    component: UploadLargeFileIndex,
    meta: {
      belong: "上传",
      menuName: "大文件上传",
    },
  },

  // performance
  {
    path: "/performance/vue",
    name: "PerformanceVue",
    component: PerformanceVueIndex,
    meta: {
      belong: "性能统计",
      menuName: "Vue",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const apm = useApm();

router.beforeEach((to, from, next) => {
  // 性能统计
  if (from.name !== to.name) {
    apm.setOptId(apm.getNewOptId());
    apm.logStatic(0);
  }

  next();
});

router.afterEach((to, from) => {
  // 性能统计
  if (from.name !== to.name) {
    apm.logStatic(1);
  }

  nextTick(() => {
    const oTextContainer = document.getElementById("performance-vue-text");
    if (oTextContainer) {
      oTextContainer.innerText =
        oTextContainer?.innerHTML + "[afterEach nextTicket change]";
    }
  });
});

export default router;
