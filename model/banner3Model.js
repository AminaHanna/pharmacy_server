import mongoose from "mongoose";

const banner3Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add title"]
    },
    percentage: {
        type: String,
        required: [true, "Please add timeline"]
    },
    rate: {
        type: String,
        required: [true, "Please add rate"]
    },
    offerRate: {
        type: String,
        required: [true, "Please add offer-rate"]
    },
    image:{
        type:String,
    }
},
    {
        timestamps: true,
    }
);

export const Banner3 = mongoose.model("Banner3", banner3Schema);