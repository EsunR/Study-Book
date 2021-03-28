<template>
  <div id="Demo04">
    <h1>欢迎光临</h1>
    <div v-if="loading">Loading</div>
    <img v-if="loaded" :src="result.imgurl" width="500" />
  </div>
</template>

<script lang="ts">
import useURLAxios from "./hooks/useURLAxios";
export default {
  name: "Demo04",
  setup() {
    const { result, loading, loaded } = useURLAxios("/api/api.php?return=json");

    return {
      result,
      loading,
      loaded,
    };
  },
};
</script>

<style lang="scss" scoped></style>
