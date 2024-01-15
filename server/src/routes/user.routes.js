import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateUserDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../controllers/auth.controller.js";

const router = Router();

//1. REGISTER USER
router.post(
  "/register",
  //injecting the multer middleware to upload file, if the file name "avatar" or "coverImage" exsits in the request, then this middleware runs
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
//2. LOGIN USER
router.post('/login', loginUser)

//SECURED ROUTES
//1. LOGOUT USER
router.post('/logout', verifyJWT, logoutUser)
//2. REFRESH TOKENS
router.post('/refresh-tokens', refreshAccessToken)
//3. CHANGE PASSWORD
router.post('/change-password', verifyJWT, changeCurrentPassword)
//4. GET USER DETAILS
router.get('/user-details', verifyJWT, getCurrentUser)
//5. UPDATE USER DETAILS
router.put('/update-details', verifyJWT, updateUserDetails)
//6. UPDATE USER AVATAR
router.put('/update-avatar', upload.fields([
  {
    name: "avatar",
    maxCount: 1,
  },
]), verifyJWT, updateUserAvatar)
//7. UPDATE USER COVER IMAGE
router.put('/update-coverImage', upload.fields([
  {
    name: "coverImage",
    maxCount: 1,
  },
]), verifyJWT, updateUserCoverImage)



export default router;
