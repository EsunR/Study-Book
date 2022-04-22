<template>
  <img
    src="https://img.alicdn.com/imgextra/i1/6000000007980/O1CN01TKs5Xo28otLaXdxYE_!!6000000007980-0-octopus.jpg"
    alt=""
  />
  <div id="performance-vue-text">原始文字</div>
  <div>资源加载时长：{{ $apm.optMap.get($apm.optid)?.sst || 0 }}</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "PerformanceVueIndex",
  setup() {
    function changeDomText(text: string) {
      const oTextContainer = document.getElementById("performance-vue-text");
      if (oTextContainer) {
        oTextContainer.innerText = oTextContainer?.innerHTML + text;
      }
    }

    changeDomText("[setup change]");

    nextTick(() => {
      changeDomText("[nextTick change]");
    });

    onBeforeMount(() => {
      changeDomText("[onBeforeMount change]");
    });

    onMounted(() => {
      changeDomText("[onMounted change]");
    });

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
