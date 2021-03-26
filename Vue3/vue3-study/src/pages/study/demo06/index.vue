<template>
  <div id="Demo06">
    <h1>Demo06</h1>
    <Suspense>
      <template #default>
        <AsyncShow />
      </template>
      <template #fallback>
        <h2>Loading... ...</h2>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import AsyncShow from "./components/AsyncShow.vue";
export default {
  name: "Demo06",
  components: {
    AsyncShow,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
