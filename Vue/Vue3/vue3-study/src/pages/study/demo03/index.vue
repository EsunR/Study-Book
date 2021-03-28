<template>
  <div>
    <div>{{ nowTime }}</div>
    <button @click="getNowTime">获取时间</button>
  </div>
</template>

<script lang="ts">
import useNowTime from "./hooks/useNowTime";

export default {
  name: "Demo03",
  setup() {
    const { nowTime, getNowTime } = useNowTime();

    return {
      nowTime,
      getNowTime,
    };
  },
};
</script>

<style lang="scss" scoped></style>
