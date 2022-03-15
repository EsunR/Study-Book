<template>
  <ElRow>
    <ElCol :span="4" class="app-nav">
      <SideNav />
    </ElCol>
    <ElCol :span="20" class="app-main">
      <router-view></router-view>
    </ElCol>
  </ElRow>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss" scoped>
.app-nav {
  height: 100vh;
}
.app-main {
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}
</style>
