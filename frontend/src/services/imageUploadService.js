import http from "./httpService";
import ReactS3 from "react-s3";

import {
  bucketName,
  albumName,
  region,
  accessKeyId,
  secretAccessKey,
} from "../credentials.json";
import { resolve } from "joi-browser";
import { reject } from "lodash";

const config = {
  bucketName,
  albumName,
  region,
  accessKeyId,
  secretAccessKey,
};

export async function uploadImage(file) {
  try {
    const url = await ReactS3.uploadFile(file, config);
    console.log("URL of aws pic: ", url.location);
    return url.location;
  } catch (err) {
    console.log("Error upload: ", err);
    return "";
  }

  // .then((data) => {
  //   console.log(data);
  //   console.log("UPLOADED: ", data.location);
  //   resolve(data.location);
  // })
  // .catch((err) => {
  //   console.log("Upload err: ", err);
  //   console.log("Returning empty string");
  //   reject("");
  // });
}

export default {
  uploadImage,
};
