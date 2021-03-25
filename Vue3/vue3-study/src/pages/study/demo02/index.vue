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

    <button @click="overAction">
      点餐完成
    </button>
    <div>{{ overText }}</div>
  </div>
</template>

<script lang="ts">
import {
  // onBeforeMount,
  // onMounted,
  // onRenderTriggered,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
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
    // console.log("setup()");
    // Life Circle Hook
    // onBeforeMount(() => {
    //   console.log("onBeforeMount");
    // });

    // onMounted(() => {
    //   console.log("onMounted");
    // });

    // onRenderTriggered(e => {
    //   console.log(e);
    // });
    const overText = ref("红浪漫");
    const overAction = () => {
      overText.value = "点餐完成|" + overText.value;
    };

    watch([overText, () => data.selectGirl], (newValue, oldValue) => {
      console.log("newValue: ", newValue);
      console.log("oldValue: ", oldValue);
      document.title = newValue[0];
    });

    return {
      ...refData,
      overText,
      overAction,
    };
  },

  watch: {
    overText(newVal: any) {
      console.log("newVal: ", newVal);
    },
    selectGirl(newVal: any) {
      console.log("newVal: ", newVal);
    },
  },
  // beforeCreate() {
  //   console.log("beforeCreate");
  // },
  // created() {
  //   console.log("created");
  // },
  // beforeMount() {
  //   console.log("beforeMount");
  // },
  // mounted() {
  //   console.log("mounted");
  // },
};
</script>

<style lang="scss" scoped></style>
