<template>
  <div>
    <h1>这是登录组件，使用 .vue 文件定义出来的 --- {{msg}}</h1>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 注意：组件中的data必须是function
      msg: "123"
    };
  },
  methods: {
    show() {
      console.log("调用了show方法");
    }
  }
};
</script>


<style>

</style>