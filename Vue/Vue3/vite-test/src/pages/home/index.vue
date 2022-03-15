<template>
  <h1 class="title">Home</h1>
  <el-row>
    <el-button @click="handleButtonClick">默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Home",
  setup() {
    const handleButtonClick = () => {
      ElMessage.success({type: "success", message: "点击按钮！"})
    };

    onMounted(()=>{
      console.log("on mounted");
    })

    return {
      handleButtonClick
    }
  },
});
</script>

<style lang="scss"></style>
