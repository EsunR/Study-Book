<template>
  <h1>{{ msg }}</h1>
  <button type="button" @click="count++">count is: {{ count }}</button>
  <TextInput
    label-name="乌拉拉"
    v-model:value="textInputValue"
    @my-click="handleTextInputBtnClick"
  />
  <span>{{ textInputValue }}</span>

  <TextInputTs @btn-click="handleTextInputTsBtnClick" />
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import TextInput from "./TextInput.vue";
import TextInputTs from "./TextInputTs.vue";

export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      textInputValue: "lalalalal",
    };
  },
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  components: {
    TextInput,
    TextInputTs,
  },
  setup: () => {
    const count = ref(0);
    return { count };
  },
  methods: {
    handleTextInputBtnClick() {
      alert(this.textInputValue);
    },
    handleTextInputTsBtnClick(e: Event) {
      const oButton = e.target as HTMLButtonElement;
      console.log("handleTextInputTsBtnClick:", oButton);
    },
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
