<template>
  <div id="Demo07">
    <h1>Demo07</h1>
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
import { onErrorCaptured } from "vue";
export default {
  name: "Demo07",
  components: {
    AsyncShow,
  },
  setup() {
    onErrorCaptured(error => {
      console.log(error);
      return true;
    });

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
