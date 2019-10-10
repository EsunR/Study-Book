<template>
  <div>
    <!-- 滑动栏区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            href="#item1mobile"
            @tap="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photolist/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h2 class="info-title">{{item.title}}</h2>
          <div class="info-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      cates: [], // 存放物品分类
      list: []
    };
  },
  created() {
    this.getSort();
    // 默认进入页面就主动请求所有图片列表的顺序
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 需要在组件的 mounted 事件钩子中，注册 mui 的 scroll 滚动事件
    // 如果要操作元素了，最好在mounted中操作，因为这是最新的
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getSort() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          this.cates = res.body.message;
          this.cates.unshift({ title: "全部", id: 0 });
        }
      });
    },
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(res => {
        if (res.body.status == 0) {
          this.list = res.body.message;
          for (let i in this.list) {
            this.list[i].img_url =
              "https://img.3dmgame.com/uploads/images/thumbnews/20181202/1543742699_596898.jpg";
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#slider {
  touch-action: none;
}
.photo-list {
  list-style: none;
  padding: 0 10px;
  margin: 0;
  li {
    background-color: #ccc;
    margin-bottom: 10px;
    text-align: center;
    position: relative;
    img {
      width: 100%;
      vertical-align: bottom;
      box-shadow: 0 0 9px #999;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      text-align: left;
      position: absolute;
      color: white;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 91px;
      padding: 0 5px;
      .info-title {
        font-size: 14px;
        line-height: 20px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
