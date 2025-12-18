import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb" , limit:"16kb"})) // here you are giving the limit of json file
app.use(express.urlencoded({extended:true}))// if you dont give any thing it will also work
                                            // it is yoused for url syntax
app.use(express.static("public"))

app.use(cookieParser()) // it use to store some thing to the user cookie and only server can read it

//routes import
import userRouter from './routes/user.routes.js'


// routes declaration
app.use("/api/v1/users" , userRouter)


export { app }