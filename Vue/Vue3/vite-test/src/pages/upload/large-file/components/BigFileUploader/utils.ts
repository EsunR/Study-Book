import { UPLOAD_PART_SIZE } from "./config";
import { IPartUploadTask } from "./types";

export function getPartUploadTasks(file: File): IPartUploadTask[] {
  let leftSize = file.size;
  let offset = 0;
  let partNumber = 1;

  let tasks = [];

  while (leftSize > 0) {
    let partSize = Math.min(leftSize, UPLOAD_PART_SIZE);
    tasks.push({
      file: file,
      partNumber: partNumber,
      partSize: partSize,
      start: offset,
      stop: offset + partSize - 1,
    });

    leftSize -= partSize;
    offset += partSize;
    partNumber += 1;
  }
  return tasks;
}
