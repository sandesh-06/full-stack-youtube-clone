import dotenv from "dotenv"
import connectToDB from "./db/index.js"
import app from "./app.js"

//always do the dotenv config at the start of index file
dotenv.config({
    path: './.env'
})

connectToDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server Listing on port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongo connection failed !", err.message)
})