import mongoose, {Schema} from "mongoose";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary url
            required: true
        },
        thumbnail: {
            type: String, // cloudnery url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        duration: {
            type: Number, // cloudney url 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true
    }
)

export const Video = mongoose.model("Video" , videoSchema)