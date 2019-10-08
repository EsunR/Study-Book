<template>
  <div class="newinfo-content">
    <!-- 标题 -->
    <h3 class="title">新闻标题</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>
    <hr>
    <!-- 新闻内容 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区 -->
    <commentBox :id="this.id"></commentBox>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewInfo();
  },
  methods: {
    getNewInfo() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.newsinfo = res.body.message[0];
        } else {
          Toast("读取新闻详情失败");
        }
      });
    }
  },
  components: {
    commentBox: comment
  }
};
</script>

<style lang="scss" scoped>
.newinfo-content {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    padding: 0 8px;
    font-size: 13px;
  }
}
</style>
