<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item, index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="switchObj[item.id]" @change="switchChange(item.id, switchObj[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <div>
                <span class="price">${{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getItemCount[item.id]" :itemId="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不包含运费）</p>
              <p>已勾选商品<span class="red">{{$store.getters.getSum.count}}</span>件，总价￥<span class="red">{{$store.getters.getSum.totalPrice}}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template> 

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  components: {
    numbox
  },
  data() {
    return {
      switchObj: this.$store.getters.getSelect,
      goodslist: [] //购物车中的所有商品数据
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    getGoodslist() {
      var itemArr = [];
      this.$store.state.car.forEach(item => {
        itemArr.push(item.id);
      });
      if (itemArr.length == 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + itemArr.join(","))
        .then(res => {
          this.goodslist = res.body.message;
        });
    },
    remove(itemId, index) {
      // 删除分两步
      // 1. 删除本组件内的goodsList中的数据
      this.goodslist.splice(index, 1);
      // 2. 删除利用commit函数删除store中的数据
      this.$store.commit("deleteItemFromCar", itemId);
    },
    switchChange(itemId, selected){
      this.$store.commit('switchChange', {id: itemId, selected: selected})
    }
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 50px;
      height: 50px;
      margin: 0 5px;
      border-radius: 5px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 50px;
      h1 {
        font-size: 13px;
      }
      .price {
        font-weight: bold;
        color: red;
      }
    }
  }
  .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
      padding: 0 5px;
    }
  }
}
</style>

