declare module "@baiducloud/sdk" {
  interface IUploadPartFromBlobResHeader {
    "content-length": string;
    "content-type": string;
    etag: string;
    "x-bce-request-id": string;
  }

  interface ICompleteMultipartUploadPartListItem {
    partNumber: number;
    eTag: string;
  }

  class BosClient extends BaiduBce.SDK.BosClient {
    putObjectFromString(
      bucket: string,
      key: string,
      bufferString: string
    ): BaiduBce.SDK.BosResponse<any, {}>;

    putObjectFromBlob(
      bucket: string,
      key: string,
      blob: Blob
    ): BaiduBce.SDK.BosResponse<any, {}>;

    initiateMultipartUpload(
      bucket: string,
      key: string,
      options?: any
    ): BaiduBce.SDK.BosResponse<
      { bucket: string; key: string; uploadId: string },
      {}
    >;

    // Nodejs API
    uploadPartFromFile(
      bucketName: string,
      key: string,
      uploadId: string,
      partNumber: number,
      partSize: number,
      file: File,
      start: number
    ): BaiduBce.SDK.BosResponse<any, any>;

    // Web API
    uploadPartFromBlob(
      bucketName: string,
      key: string,
      uploadId: string,
      partNumber: number,
      partSize: number,
      blob: Blob
    ): BaiduBce.SDK.BosResponse<{}, IUploadPartFromBlobResHeader>;

    completeMultipartUpload(
      bucket: string,
      key: string,
      uploadId: string,
      partList: ICompleteMultipartUploadPartListItem[]
    ): BaiduBce.SDK.BosResponse<
      {
        bucket: string;
        eTag: string;
        key: string;
        location: string;
      },
      any
    >;
  }
}
