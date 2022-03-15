<template>
  <el-menu>
    <menu-item v-for="item in routerConfig" :item="item" />
  </el-menu>
</template>

<script lang="ts">
import { routerConfig } from "@/router/routerConfig";
import { defineComponent } from "@vue/runtime-core";
import { ElMenu } from "element-plus";
import MenuItem from "./components/MenuItem.vue";

export default defineComponent({
  name: "SideNav",
  components: {
    ElMenu,
    MenuItem,
  },
  setup() {
    return {
      routerConfig,
    };
  },
});
</script>
