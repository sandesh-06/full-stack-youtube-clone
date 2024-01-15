import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"



export const verifyJWT = asyncHandler(async(req, res, next)=>{
    try {
        //1. GET THE ACCESS TOKEN FROM COOKIES
        const accessToken = req.cookies?.accessToken
        if(!accessToken) throw new ApiError(401, "Unauthorized Request! (you don't have access token)")

        //2. VERIFY THE ACCESS TOKEN
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    
        //3. GET USER DETAILS FROM THE PAYLOAD PRESENT IN TOKEN
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user) throw new ApiError(401, "Invalid Access Token")

        //4. ONCE WE HAVE THE USER, STORE USER IN REQUEST
        req.user = user

        next()

    } catch (error) {
        throw new ApiError(401, "You are not logged in!")
    }
})