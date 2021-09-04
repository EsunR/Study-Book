<template>
  <div>
    <button @click="handleClick">点我</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, setTransitionHooks } from "@vue/runtime-core";

export default defineComponent({
  name: "TextInput",
  data() {
    return {
      listData: [] as any[],
    };
  },
  props: {
    labelName: String,
    value: String,
  },
  emits: {
    "btn-click": (e: Event) => e instanceof Event,
  },
  methods: {
    handleClick(e: Event) {
      this.$emit("btn-click", e);
    },
  },
});
</script>
