<template>
  <div>
    <h1>简单上传调试</h1>
    <el-button @click="handleDebugBtnClick">点我调试</el-button>
  </div>

  <el-divider />

  <div>
    <h1>选择图片上传</h1>
    <input @change="onFileInputChange" type="file" />
    <el-button type="primary" @click="handleUploadSelectedImage"
      >上传</el-button
    >
  </div>

  <el-divider />

  <div>
    <h1>查询</h1>
    <GetFile :bos-client="bosClient" :bucket-name="BOS_BUCKET" />
  </div>

  <el-divider />

  <div>
    <h1>大文件上传</h1>
    <BigFileUploader
      :bos-client="bosClient"
      :bucket-name="BOS_BUCKET"
      v-model="uploadFiles"
      :limit="1"
    />
    <el-button @click="getModelValue">获取绑定值</el-button>
  </div>
</template>

<script lang="ts">
import { BosClient } from "@baiducloud/sdk";
import { defineComponent, ref } from "vue";
import { BOS_AK, BOS_BUCKET, BOS_SK } from "./config";
import BigFileUploader from "./components/BigFileUploader/index.vue";
import GetFile from "./components/GetFile/index.vue";
import { UploadFile } from "element-plus/lib/components/upload/src/upload";

const bosClient = new BosClient({
  endpoint: "https://bj.bcebos.com",
  credentials: {
    ak: BOS_AK,
    sk: BOS_SK,
  },
});

export default defineComponent({
  name: "LargeFileIndex",
  components: { BigFileUploader, GetFile },
  setup() {
    const selectedFile = ref<File>();
    const uploadFiles = ref<UploadFile[]>([]);

    const handleDebugBtnClick = () => {
      const bucket = BOS_BUCKET;
      const key = "hello";
      bosClient.putObjectFromString(bucket, key, "hello word").then((res) => {
        console.log(res);
      });
    };
    
    const onFileInputChange = (e: Event) => {
      const inputEl = e.target as HTMLInputElement;
      selectedFile.value = inputEl.files?.[0];
    };

    const handleUploadSelectedImage = () => {
      if (selectedFile.value) {
        const key = selectedFile.value.name;
        bosClient.putObjectFromBlob(BOS_BUCKET, key, selectedFile.value);
      }
    };

    const getModelValue = () => {
      console.log(uploadFiles.value);
    };

    return {
      // state
      uploadFiles,
      bosClient,
      BOS_BUCKET,
      // methods
      handleDebugBtnClick,
      onFileInputChange,
      handleUploadSelectedImage,
      getModelValue,
    };
  },
});
</script>

<style lang="scss" scoped></style>
