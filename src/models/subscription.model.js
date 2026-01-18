import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, //one who is subscring
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId, //one whome the suscriber is subscring
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription" , subscriptionSchema)