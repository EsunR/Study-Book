<template>
  <ElRow>
    <ElCol :span="4">
      <SideNav />
    </ElCol>
    <ElCol :span="20">
      <router-view></router-view>
    </ElCol>
  </ElRow>
</template>

<script lang="ts">
import { ElCol, ElRow } from "element-plus";
import { defineComponent } from "vue";
import SideNav from "@/components/SideNav.vue";

export default defineComponent({
  name: "App",
  components: {
    ElCol,
    ElRow,
    SideNav,
  },
});
</script>

<style></style>
