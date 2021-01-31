<template>
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
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
interface DataProps {
  girls: string[];
  selectGirl: string;
  selectGirlFun: (index: number) => void;
}

export default {
  name: "Demo02",
  setup() {
    const data: DataProps = reactive({
      girls: ["大脚", "刘英", "晓红"],
      selectGirl: "",
      selectGirlFun: (index: number) => {
        data.selectGirl = data.girls[index];
      },
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>

<style lang="scss" scoped></style>
