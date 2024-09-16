import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl as s3getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { REVALIDATE_SECS } from "./constants";

const s3 = new S3Client({ region: process.env.S3_REGION });

export function getSignedUrl(Key: string) {
  // return Promise.resolve("");
  return s3getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key,
    }),
    { expiresIn: REVALIDATE_SECS }
  );
}

export function upload(fileName: string, buffer: ArrayBuffer) {
  return s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Body: buffer as Buffer,
    })
  );
}

export default s3;
