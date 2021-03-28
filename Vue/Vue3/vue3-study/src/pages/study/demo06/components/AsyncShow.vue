<template>
  <div class="async-show">
    <h2>Result: {{ result }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AsyncShow",
  setup() {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve({ result: { name: "EsunR", age: 18 } });
      }, 2000);
    });
  },
});
</script>

<style lang="scss" scoped></style>
