import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: { //subscriber info
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel: { //the subscribed channel info
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

/*EVERYTIME WHEN SOMEONE SUBSCRIBES TO A CHANNEL, A NEW DOCUMENT IS CREATED EG: IF PERSON "P1" SUBSCRIBES TO CHANNEL "C1"
    {
        subscriber: "P1",
        channel: "C1"
    }

    WHEN YOU NEED THE NO.OF SUBSCRIBERS FOR A CHANNEL, ADD ALL THE DOCUMENT WITH THE CHANNEL NAME.
    EG: IF YOU NEED SUBS COUNT OF CHANNEL 'C1', ADD ALL DOCUMENTS CONTAINING channel: "c1"

    WHEN YOU NEED ALL THE CHANNELS SUBSCRIBED BY A PERSON, GET ALL THE DOCUMENT WITH THE SUBSCRIBER.
    EG: IF YOU NEED THE CHANNELS SUBSCRIBED BY PERSON "P1", GET THE DOCUMENTS WITH subscriber: "P1"
*/
export const Subscription = mongoose.model("Subscription", subscriptionSchema)