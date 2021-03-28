<template>
  <div class="modal-component">
    <button @click="changeModalVisible">点击显示模态框</button>

    <teleport to="body">
      <div class="modal" v-if="modalVisible" @click="changeModalVisible">
        <div class="modal-content" @click.stop="">
          <h2>EsunR.xyz</h2>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  name: "",
  setup() {
    const modalVisible = ref(false);

    const changeModalVisible = () => {
      modalVisible.value = !modalVisible.value;
    };

    return {
      modalVisible,
      changeModalVisible,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  .modal-content {
    width: 200px;
    height: 200px;
    border: 2px solid #000000;
    background: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
}
</style>
