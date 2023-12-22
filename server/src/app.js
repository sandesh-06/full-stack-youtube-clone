//IMPORTING MODULES
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//CONFIGURATIONS
app.use(cors({
    origin: process.env.CORS_ORIGIN, // '*' means to accept from all the urls, you can also a particular url
}))
app.use(express.json({limit: "20kb"})); //accept json requests with a limit
app.use(express.urlencoded({extended: true, limit: "16kb"})) //used when data is passed in the url.
app.use(express.static("public")) //when a file is received and you want to store it in public folder for temporary basis
app.use(cookieParser()) //to perform operations on cookies
export default app;