<template>
  <div class="get-file">
    <el-row :gutter="16">
      <el-col :span="20">
        <el-input
          v-model="fileKey"
          placeholder="input bos file key"
          type="text"
        />
      </el-col>
      <el-col :span="4">
        <el-button @click="onGetFileBtnClick">获取文件</el-button>
      </el-col>
    </el-row>
    <a v-if="fileUrl" :href="fileUrl">点击下载</a>
  </div>
</template>

<script lang="ts">
import { BosClient } from "@baiducloud/sdk";
import { defineComponent, PropType, ref, toRefs } from "vue";

export default defineComponent({
  name: "GetFile",
  props: {
    bosClient: {
      type: Object as PropType<BosClient>,
      required: true,
    },
    bucketName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { bosClient, bucketName } = toRefs(props);
    const fileKey = ref<string>("");
    const fileUrl = ref<string>("");

    const onGetFileBtnClick = async () => {
      // 拼接下载连接
      const res = await bosClient.value.getBucketLocation(bucketName.value);
      const location = res.body.locationConstraint;
      fileUrl.value = `${window.location.protocol}//${bucketName.value}.${location}.bcebos.com/${fileKey.value}`;

      // getObject 是获取实例
      // const res = await bosClient.value.getObject(
      //   bucketName.value,
      //   fileKey.value
      // );
    };

    return {
      // data
      fileKey,
      fileUrl,
      // methods
      onGetFileBtnClick,
    };
  },
});
</script>
