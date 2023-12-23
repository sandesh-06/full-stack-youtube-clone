import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// DECLARING SCHEMA
const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true //to optimize searching in db
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //url from cloudinary
        required: true,
    },
    coverImage: {
        type: String, //url from cloudinary
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required:[true, 'Password is required']
    },
    refreshToken:{
        type: String
    }

},{timestamps: true})

// CUSTOM METHOD / FUNCTIONS
//1. We need to hash the password before saving the doc using the "pre" function of mongoose
userSchema.pre("save", async function(next){ //if you use arrow funciton we can't use "this" keyword

    //we don't want to hash the password everytime some updation takes place
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

//2.writing our own function to check if password is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
    //return a boolean

}

//3. writing our own method in mongoose to generate access and refresh token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },

        //secret code
        process.env.ACCESS_TOKEN_SECRET,

        //expiry time
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        //payload
        {
            _id: this._id,
        },

        //secret code
        process.env.REFRESH_TOKEN_SECRET,

        //expiry time of refresh is usually greater than access
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}


//EXPORTING THE SCHEMA
export const User = mongoose.model("User", userSchema)