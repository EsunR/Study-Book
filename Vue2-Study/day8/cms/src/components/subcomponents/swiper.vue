<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(item, i) in lunbotuList" :key="i">
      <img :src="item.img" :class="{isfull:isfull}">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props: ["lunbotuList", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 15rem;
  .mint-swipe-item {
    text-align: center;
    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.isfull {
  width: 100%;
}
</style>