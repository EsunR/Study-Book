<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
      <span>点击：{{photoinfo.click}}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <vue-preview class="preview" :slides="list" @close="handleClose"></vue-preview>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import Comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: [] // 图片缩略图
    };
  },
  created() {
    this.getPhotoInfo();
    this.getPreviewList();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.photoinfo = res.body.message[0];
        }
      });
    },
    getPreviewList() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message;
          // https://img.3dmgame.com/uploads/images/news/20181202/1543708638_631647.jpg
          let id = 0;
          this.list.forEach(function(item) {
            item.id = id++;
            item.src =
              "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg";
            item.msrc =
              "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg";
            item.w = "600";
            item.h = "400";
          });
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "cmt-box": Comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  h3 {
    font-size: 16px;
    color: rgb(0, 153, 255);
    text-align: center;
    margin: 10px 0;
  }
  .subtitle {
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 14px;
    line-height: 25px;
    padding: 0 5px;
    text-indent: 2em;
  }
}
</style>

<style lang="scss">
.preview {
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
    width: 330px;
    margin: 20px auto;
    figure {
      padding: 0px;
      margin: 0px;
      display: block;
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin: 5px;
      img{
        height: 100%;
        margin-left: -25%;
      }
    }
  }
}
</style>
