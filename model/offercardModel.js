import mongoose from "mongoose";

const offercardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add Offer card title"]
    },
    description: {
        type: String,
        required: [true, "Please add description"]
    },
    timeline: {
        type: String,
        required: [true, "Please add description"]
    },
    offerRate: {
        type: String,
        required: [true, "Please add description"]
    }
},
    {
        timestamps:true
    }
);

export const Offercard = mongoose.model("Offercard", offercardSchema);