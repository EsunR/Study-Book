<template>
  <div>
    <div>
      <router-link to="/study">Study Part</router-link>
    </div>

    <div>
      <ts-button :type="'success'">ts 引入</ts-button>
      <el-button type="primary">普通引入</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElButton } from "element-plus";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    "ts-button": ElButton,
  },
});
</script>

<style lang="scss"></style>
