import { asyncHandler } from "../utils/asyncHandlers.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req , res) => {
    // get user details from frontnd
    // validation - not empty
    // check if user alrady exists: user name , email
    // check for images and avatar
    // upload them to cloudinary, avatar
    // creat user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return res

    const {fullName , email , username , password} = req.body
    console.log("email: ", email);

    //we can also use the if condition to check all the fields, but js also provede the "some" method
    // which check all the at once

    if (
        [fullName , email , username , password].some((field)=>
            field?.trim() ==="")
    ) {
            throw new ApiError(400 , "All fields are requires")
    }

    const existedUser = await User.findOne({
        $or : [{ username }, { email }] // it are checkin for these fieldes in the user , if finds any return already exist return already exist
        
    })

    if (existedUser) {
        throw new ApiError(409 , "User with email or user name already exist")
    }
    // we are taking the path from multer 
    //NOTE: we are taking the reference of the local path because right now the image is at multer i.e. middleware and it is not uploded on cloudinary

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400 , "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500 , "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User registered Succesfully" )
    )

})

export {registerUser}