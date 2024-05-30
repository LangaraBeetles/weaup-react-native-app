/**********************************
  
 TODO: Will be moved to backend

**********************************/

import AWS from 'aws-sdk'

//check clickup for the credentials
const bucketName = '';
const accessKeyId =  '';
const secretAccessKey = '';
const region = '';

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
})

const s3 = new AWS.S3();


export const uploadFile = (fileName: string, filePath: string) => { 
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

  
  