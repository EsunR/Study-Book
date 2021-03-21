<template>
  <div>
    <div>
      <h2>欢迎光临红浪漫洗浴中心</h2>
      <div>请选择一位美女为你服务</div>
    </div>
    <div>
      <button
        v-for="(item, index) in girls"
        v-bind:key="index"
        @click="selectGirlFun(index)"
      >
        {{ index }} : {{ item }}
      </button>
    </div>
    <div>你选择了【{{ selectGirl }}】为你服务</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const girls = ref(["大脚", "刘英", "晓红"]);
    const selectGirl = ref("");
    const selectGirlFun = (index: number) => {
      selectGirl.value = girls.value[index];
    };
    //因为在模板中这些变量和方法都需要条用，所以需要return出去。
    return {
      girls,
      selectGirl,
      selectGirlFun,
    };
  },
});
</script>

<style lang="scss" scoped></style>
