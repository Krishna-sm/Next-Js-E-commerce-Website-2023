
import  cloudinary from 'cloudinary'

cloudinary.v2.config({
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  cloud_name: process.env.cloud_name,
});


// upload image 

export const UploadImage = async(file:File,folder:string)=>{

    const arrayBuffer = await file.arrayBuffer();
    const bytesBuffer = Buffer.from(arrayBuffer);

    return new Promise(async(resolve,reject)=>{
        cloudinary.v2.uploader
          .upload_stream(
            {
              resource_type: "auto",
              folder: folder,
            },
            async (err, result) => {
              if (err) {
                reject(err.message);
              }
              resolve(result);
            }
          )
          .end(bytesBuffer);
    })
}

// delete image 

export const DeleteIamge = async(public_id:string)=>{

    return new Promise(async(resolve,reject)=>{
       try {
            const result = await cloudinary.v2.uploader.destroy(public_id); 
            resolve(result);
       } catch (error) {
        reject(error);
       }
    })
}