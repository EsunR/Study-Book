import Layout from "@/components/Layout/index.vue";
import { RouteRecordRaw } from "vue-router";

export type RouteConfigRaw = RouteRecordRaw & {
  cnName?: string;
  icon?: string;
  hideInNav?: boolean;
  children?: RouteConfigRaw[];
};

export const routerConfig: RouteConfigRaw[] = [
  {
    path: "/",
    redirect: "/home",
    hideInNav: true,
  },
  {
    path: "/home",
    redirect: "/home/index",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Home",
        cnName: "首页",
        component: () => import("@/pages/Home.vue"),
      },
    ],
  },
  {
    path: "/element-ui-test",
    name: "ElementUI 测试",
    redirect: "/element-ui-test/form",
    component: Layout,
    children: [
      {
        path: "form",
        name: "ElementUITestForm",
        cnName: "表单",
        component: () => import("@/pages/element-ui-test/form/index.vue"),
      },
      {
        path: "form2",
        name: "ElementUITestForm2",
        cnName: "表单2",
        component: () => import("@/pages/element-ui-test/form/index.vue"),
      },
      {
        path: "form3",
        name: "ElementUITestForm3",
        cnName: "表单3",
        component: () => import("@/pages/element-ui-test/form/index.vue"),
      },
    ],
  },
];
