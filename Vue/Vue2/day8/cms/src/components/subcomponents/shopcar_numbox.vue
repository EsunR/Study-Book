<template>
  <div class="mui-numbox" data-numbox-min="1" style="height: 25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initcount"
      ref="number_box"
      @change="changeNum"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  props: ["initcount", "itemId"],
  methods: {
    changeNum(){
      let goodsInfo = {
        id: this.itemId,
        count: this.$refs.number_box.value
      };
      this.$store.commit('shopCarNumChange', goodsInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
