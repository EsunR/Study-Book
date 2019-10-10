<template>
  <div class="goods-list">
    <!-- < :to="'/home/goodsinfo/' + item.id" class="goods-item" v-for="item in goodslist" :key="item.id" tag="div"> -->
    <!-- 使用编程式导航 -->
    <div
      :to="'/home/goodsinfo/' + item.id"
      class="goods-item"
      v-for="item in goodslist"
      :key="item.id"
      @click="goDetail(item.id)"
    >
      <img :src="item.img_url">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">${{item.sell_price}}</span>
          <span class="old">${{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
    <!-- </router-link> -->
    <mt-button type="danger" size="large" @click="getMore()">获取更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1, // 分页的页数
      goodslist: [] // 存放商品列表的数组
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(res => {
        res.body.message.forEach(element => {
          element.img_url =
            "http://img.cdn.esunr.xyz/IMG_20190120_230917.jpg";
        });
        this.goodslist = this.goodslist.concat(res.body.message);
      });
    },
    getMore() {
      if (this.goodslist.length % 10 == 0) {
        this.pageindex++;
        this.getGoodsList();
      } else {
        Toast("没有更多了QAQ");
      }
    },
    goDetail(id) {
      // 注意：一定要区分 $router 和 $route
      // this.$route 是路由参数对象，所有路由中的参数，params，query都属于它
      // this.$router 是一个路由导航对象，用它可以方便地使用用js代码实现路由的前进、后退、跳转刷新到新的URL地址

      // 1.最简单的
      // this.$router.push("/home/goodsinfo/" + id);
      // 2.传递对象
      // this.$router.push({ path: "/home/goodsinfo/" + id });
      this.$router.push({ name: "goodsinfo", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    padding: 2px;
    margin: 4px 0;
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }

        .old {
          text-decoration: line-through;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }

  .mint-button {
    margin: 10px 0;
  }
}
</style>
