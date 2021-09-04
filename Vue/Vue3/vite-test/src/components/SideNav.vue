<template>
  <el-menu>
    <el-sub-menu
      v-for="routeItem in routes"
      v-show="!routeItem.redirect"
      :key="routeItem.path"
      :index="routeItem.path"
    >
      <template #title>{{ routeItem.name }}</template>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ElMenu, ElSubMenu, ElMenuItem } from "element-plus";
import { routes } from "@/router/index";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "SideNav",
  components: {
    "el-menu": ElMenu,
    "el-sub-menu": ElSubMenu,
    "el-menu-item": ElMenuItem,
  },
  data() {
    return {
      routes,
    };
  },
  computed: {
    aviliableRoutes(): RouteRecordRaw[] {
      if (this.routes instanceof Array) {
        return this.routes.filter((route) => route.redirect);
      } else {
        return [];
      }
    },
  },
});
</script>
