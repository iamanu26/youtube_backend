import mongoose , {Schema} from "mongoose";
import jwt from  "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowcase: true,
            trim: true,
            index:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowcase: true,
            trim: true,
            
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index:true
        },
        avatar: {
            type: String,
            required: true,
            
        },
        coverImage: {
            type: String , // cloudinary url
        },
        watchHistory:[
            {
            type: Schema.Types.ObjectId,
            ref: "Video"
             }
        ],
        password: {
            type: String,
            required: [true , 'Password is required']
        },
        refreshToken:{
            type:String
        }
        

    },
    {
        timestamps: true
    }
)
//Here we don't use the arrow functio()=>{} because it dont have a current context access that is of (this)
userSchema.pre("save" , async function(next) {
    //when ever user access the user model it run the all field , so we dont have to save the password again and again we are using this if condition check

    if(!this.Modified("password")) return next()
    this.password = bcrypt.hash(this.password , 10)
    next()
} )

userSchema.methods.isPasswordCorrect = async function(password){
  return await  bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email:this.email,
            username: this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User" , userSchema)