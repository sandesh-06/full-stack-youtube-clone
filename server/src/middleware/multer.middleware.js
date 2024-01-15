import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb - call back
      cb(null, "./public/temp") //store the file temporarily in this location
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //it is best practice to generate unique name for a file, as of now we are going with the ori name.
    }
  })
  
export const upload = multer({ 
    storage, //storage: storage
})