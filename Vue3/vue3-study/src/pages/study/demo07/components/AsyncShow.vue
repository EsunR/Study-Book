<template>
  <div class="async-show">
    <h2>Result: {{ result }}</h2>
    <img :src="result && result.imgurl" alt="" width="600" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AsyncShow",
  async setup() {
    const rawData = await axios.get("/api/api.php?return=json");
    // const rawData = await axios.get("/api/apiiii.php?return=json");
    return {
      result: rawData.data,
    };
  },
});
</script>

<style lang="scss" scoped></style>
