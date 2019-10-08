<template>
  <div>
    <h1>这是App组件</h1>

    <mt-button type="default" @click="show()">default</mt-button>
    <mt-button size="large" type="primary">large</mt-button>
    <mt-button size="small">small</mt-button>

    <!-- <mybtn type="primary">12345</mybtn> -->

    <button type="button" class="mui-btn mui-btn-royal">
      紫色
    </button>

    <div>
      <router-link to="/account">Account</router-link>
      <router-link to="/goodslist">Goodslist</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 按需导入toast组件
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      toastEle: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    show() {
      // Toast("显示Toast方法");
      this.toastEle = Toast({
        message: "这是消息",
        duration: -1,
        position: "bottom",
        iconClass: "glyphicon glyphicon-heart",
        className: "mytoast"
      });
    },
    getList() {
      this.show();
      // 由于function会产生作用域问题，所以要使用箭头函数
      setTimeout(() => {
        this.toastEle.close();
      }, 3000);
    }
  }
};
</script>

<style>
</style>