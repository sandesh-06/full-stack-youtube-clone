import {v2 as cloudinary} from "cloudinary"
import fs from "fs" //fs - file system
   
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

//INSTEAD OF UPLOADING THE FILE DIRECTLY TO CLOUDINARY, WE FIRST STORE IT IN LOCAL SERVER(using multer) AND FROM LOCAL SERVER WE UPLOAD THE FILE.
const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null

        //upload file on cloudinary
        const res = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" //auto detect which type of file is getting uploaded
        }) 

        //when file has been uploaded successfully
        console.log("file upload success ", res.url)

        return res

    } catch (error) {
        fs.unlinkSync(localFilePath) //when upload fails remove the locally saved file as well

        return null
    }
}


export {uploadOnCloudinary}