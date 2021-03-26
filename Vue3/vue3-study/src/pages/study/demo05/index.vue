<template>
  <div id="Demo05">
    <Modal />
    <h1>Demo05</h1>
    <p>
      Vue 鼓励我们通过将 UI 和相关行为封装到组件中来构建
      UI。我们可以将它们嵌套在另一个内部，以构建一个组成应用程序 UI 的树。
    </p>
    <p>
      然而，有时组件模板的一部分逻辑上属于该组件，而从技术角度来看，最好将模板的这一部分移动到
      DOM 中 Vue app 之外的其他位置。
    </p>
    <p>
      一个常见的场景是创建一个包含全屏模式的组件。在大多数情况下，你希望模态的逻辑存在于组件中，但是模态的定位很快就很难通过
      CSS 来解决，或者需要更改组件组合。
    </p>
  </div>
</template>

<script lang="ts">
import Modal from "./components/Modal.vue";

export default {
  name: "Demo05",
  components: {
    Modal,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#Demo05 {
  position: relative;
}
</style>
