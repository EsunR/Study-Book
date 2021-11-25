<template>
  <ElRow>
    <ElCol :span="4">
      <SideNav />
    </ElCol>
    <ElCol :span="20">
      <router-view />
    </ElCol>
  </ElRow>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { RouterView } from "vue-router";
import SideNav from "./SideNav/index.vue";

export default defineComponent({
  name: "",
  components: {
    RouterView,
    SideNav,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
