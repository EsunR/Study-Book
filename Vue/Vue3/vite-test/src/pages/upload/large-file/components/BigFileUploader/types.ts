export interface IPartUploadTask {
  file: File;
  partNumber: number;
  partSize: number;
  start: number;
  stop: number;
}
