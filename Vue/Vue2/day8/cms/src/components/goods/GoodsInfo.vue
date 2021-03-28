<template>
  <div class="goodsinfo-cont">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotuList"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>${{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">${{goodsInfo.sell_price}}</span>
          </p>
          <p>购买数量：
            <numbox @func="getSelectCount" :max="goodsInfo.stock_quantity"></numbox>
          </p>
          <mt-button type="primary" size="small">立即购买</mt-button>
          <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品信息</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}</p>
          <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goGoodsDesc()">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goGoodsComment()">商品评论</mt-button>
        <!-- 分析：如何加入购物车的时候拿到选择的数量 -->
        <!-- 1.按钮属于goodsinfo页面，数字属于numberbox组件 -->
        <!-- 2.由于涉及到父子组件的嵌套，所以无法直接在goodsinfo页面中获取到商品选中的数量 -->
        <!-- 3.这就要用子组件向父组件传值 —— 用事件调用机制 -->
        <!-- 4.机制原理：父向子传递方法，子组件调用这个方法，方法中的参数就是要传递的值 -->
      </div>
    </div>
  </div>
</template>

<script>
// getthumimages/:imgid
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [], // 轮播图数据
      goodsInfo: {}, // 商品信息
      ballFlag: false,
      selectCount: 1, // 保存用户选中的数量，默认用户选中一个
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status == 0) {
          res.body.message.forEach(item => {
            item.img =
              "http://img.cdn.esunr.xyz/27bfae1b215324f2.jpg";
          });
          this.lunbotuList = res.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status == 0) {
          this.goodsInfo = res.body.message[0];
        }
      });
    },
    // 点击使用编程式导航跳转到图文介绍页面
    goGoodsDesc() {
      this.$router.push({ name: "goodsdesc", params: { id: this.id } });
    },
    goGoodsComment() {
      this.$router.push({ name: "goodscomment", params: { id: this.id } });
    },
    addToShopCar(){
      this.ballFlag = !this.ballFlag;
      let goodsInfo = {
        id: this.id,
        count: this.selectCount,
        price: this.goodsInfo.sell_price,
        selected: true
      }
      this.$store.commit('addToCar', goodsInfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面中的位置
      const badgePositon = document.getElementById("badge").getBoundingClientRect();
      const xDist = badgePositon.left - ballPosition.left;
      const yDist = badgePositon.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all .7s cubic-bezier(.21,-0.43,.67,.41)";
      done()
    },
    afterEnter() {
      this.ballFlag = false;
    },
    getSelectCount(count){
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到data中的selectCount变量中
      this.selectCount = parseInt(count);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-cont {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    font-size: 16px;
    color: red;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 11;
    top: 430px;
    left: 152px;
  }
}
</style>
