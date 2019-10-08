<template>
  <div class="goodslist-container">
    <h3>{{info.title}}</h3>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {} // 图文数据
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get("api/goods/getdesc/" + this.$route.params.id)
        .then(result => {
          if (result.body.status === 0) {
            this.info = result.body.message[0];
          }
        });
    }
  }
};
</script>

<style lang="scss">
.goodslist-container {
  h3 {
    font-size: 16px;
    color: blue;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .content {
    text-indent: 1.2em;
    padding: 4px;
    text-align: justify;
    img {
      width: 100%;
      display: block;
      height: auto;
    }
    p[align=center]{
      margin-bottom: 0;
    }
  }
}
</style>
