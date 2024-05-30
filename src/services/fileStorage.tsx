/**********************************
  
 TODO: Will be moved to backend

**********************************/

import AWS from 'aws-sdk'
import config from '@src/config'
import { Blob } from 'aws-sdk/lib/dynamodb/document_client';

const bucketName = config.S3.bucketName;
const accessKeyId =  config.S3.accessKeyId;
const secretAccessKey = config.S3.secretAccessKey;
const region = config.S3.region;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
})

const s3 = new AWS.S3();


export const uploadFile = (fileName: string, filePath: Blob) => { 
  const params = {
    Bucket: bucketName, 
    Key: fileName,
    Body: filePath,
  };

  return s3.upload(params).promise();
}


export const displayFile = (fileName: string) => {
  let params = {
    Key: fileName, 
    Bucket: bucketName
  }

  return s3.getObject(params).promise();
}

  
  