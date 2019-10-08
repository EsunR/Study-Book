<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="i">
        <div class="cmt-title">
          第{{i+1}}楼&nbsp;&nbsp;
          用户：{{item.user_name}}&nbsp;&nbsp;
          发表时间：{{item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">{{item.content == "undefined" ? "无fuck说" : item.content}}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页数据
      comments: [], //评论内容
      msg: "" //用户评论
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    getComment(page = this.pageIndex) {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + page)
        .then(res => {
          if (res.body.status === 0) {
            // this.comments = res.body.message;
            this.comments = this.comments.concat(res.body.message);
          } else {
            Toast("读取评论出错!");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComment();
    },
    postComment() {
      // 检验用户输入信息是否为空
      if (this.msg.trim().length == 0) {
        return Toast("评论内容不能为空");
      }
      // 用 post 传出评论内容
      // BUG：数据传递到数据库之后，会将分页往后顶，所以在数据库中第一页的最后一条内容会加载到第二页，再点击“加载更多”，会导致重复出现第一页的最后一条评论
      this.$http
        .post("api/postcomment/" + this.id, { content: this.msg })
        .then(res => {
          if (res.body.status === 0) {
            Toast("评论成功!");
            // let user_msg = {
            //   user_name: "匿名用户",
            //   add_time: Date.now(),
            //   content: this.msg.trim()
            // };
            // this.comments.unshift(user_msg);
            this.msg = "";
            this.flashData();
          }
        });
    },
    // 在评论之后重新刷新数据，解决Bug
    flashData() {
      for (let i = 0; i < this.pageIndex; i++) {
        this.comments = [];
        this.getComment(i+1);
      }
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 13px;
    margin: 0;
  }

  .cmt-list {
    margin: 10px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
