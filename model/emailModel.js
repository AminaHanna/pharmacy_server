import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: [true, "Please add the sender id"]
    },
    reciever: {
        type: String,
        required: [true, "Please add the reciever id"]
    }
},
    {
        timestamps:true
    }
);

export const Email = mongoose.model("Email", emailSchema);