<template>
  <div>
    <label :for="labelName">{{ labelName }}</label>
    <input :name="labelName" type="text" :value="value" @input="handleInput" />
    <button @click="handleClick">Click me</button>
    <span v-for="(item, index) in listData" :key="index">{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      listData: [],
    };
  },
  props: {
    labelName: String,
    value: String,
  },
  emits: ["update:value"],
  // model: {
  //   prop: "value",
  //   event: "change",
  // },
  methods: {
    handleClick() {
      this.$emit("my-click");
    },
    handleInput() {
      this.$emit("update:value", e.target.value);
    },
  },
  created() {
    // setTimeout(() => {
    this.listData = [1, 2, 3, 4];
    // }, 1000);
  },
  beforeUpdate() {
    console.log("update");
  },
};
</script>

<style></style>
