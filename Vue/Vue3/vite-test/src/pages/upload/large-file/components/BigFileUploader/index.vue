<template>
  <div>
    <el-upload
      :file-list="modelValue"
      class="upload-demo"
      drag
      :limit="limit"
      action=""
      :http-request="customerRequestMethods"
    >
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import {
  BosClient,
  ICompleteMultipartUploadPartListItem,
  IUploadPartFromBlobResHeader,
} from "@baiducloud/sdk";
import { UploadRequestOptions } from "element-plus";
import { UploadFile } from "element-plus/lib/components/upload/src/upload";
import { defineComponent, PropType, ref, toRefs } from "vue";
import { UPLOAD_PART_SIZE } from "./config";
import { getPartUploadTasks } from "./utils";

export default defineComponent({
  name: "BigFileUploader",
  props: {
    modelValue: {
      type: Array as PropType<UploadFile[]>,
      default: undefined,
    },
    limit: {
      type: Number,
      default: 1,
    },
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

    const customerRequestMethods = async (options: UploadRequestOptions) => {
      const uploadFile = options.file as File & { uid: number };

      // 获取 upload id
      const fileBosKey = uploadFile.uid + "/" + uploadFile.name;
      const uploadId = (
        await bosClient.value.initiateMultipartUpload(
          bucketName.value,
          fileBosKey
        )
      ).body.uploadId;

      // 对每个文件分片进逐一上传
      const uploadTasks = getPartUploadTasks(uploadFile);
      const uploadState = {
        lengthComputable: true,
        loaded: 0,
        total: uploadTasks.length,
      };
      const uploadResponseHeaders: IUploadPartFromBlobResHeader[] = [];
      for (let index = 0; index < uploadTasks.length; index++) {
        const task = uploadTasks[index];
        const fileBlob = task.file.slice(task.start, task.stop + 1);
        const res = await bosClient.value.uploadPartFromBlob(
          bucketName.value,
          fileBosKey,
          uploadId,
          task.partNumber,
          task.partSize,
          fileBlob
        );
        ++uploadState.loaded;
        uploadResponseHeaders.push(res.http_headers);
        // 触发 elUpload onProgress 事件
        const progressEvent = new ProgressEvent("bigFileUploading", {
          total: uploadFile.size,
          loaded: task.partSize + (task.partNumber - 1) * UPLOAD_PART_SIZE,
        });
        options.onProgress({
          ...progressEvent,
          percent: Math.ceil(
            (progressEvent.loaded / progressEvent.total) * 100
          ),
        });
      }

      // 生成分块清单，通知 bos 上传已完成
      const partList: ICompleteMultipartUploadPartListItem[] = [];
      uploadResponseHeaders.forEach((header, index) => {
        partList.push({
          partNumber: index + 1,
          eTag: header.etag,
        });
      });
      const uploadCompleteRes = (
        await bosClient.value.completeMultipartUpload(
          bucketName.value,
          fileBosKey,
          uploadId,
          partList
        )
      ).body;
      // 通知 ElUpload 上传成功
      return uploadCompleteRes;
    };

    return {
      customerRequestMethods,
    };
  },
});
</script>

<style lang="scss" scoped></style>
