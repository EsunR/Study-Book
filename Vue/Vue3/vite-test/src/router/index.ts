import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// Home
const Home = () => import("@/pages/home/index.vue");
// Upload
const UploadImageIndex = () => import("@/pages/upload/image/index.vue");
const UploadLargeFileIndex = () =>
  import("@/pages/upload/large-file/index.vue");

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
