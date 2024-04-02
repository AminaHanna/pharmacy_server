import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the product name"]
    },
    details: {
        type: String,
        required: [true, "Please add the product name"]
    },
    price: {
        type: String,
        required: [true, "Please add the product name"]
    },
    delivery: {
        type: String,
        required: [true, "Please add the product name"]
    },
    quantity: {
        type: String,
        required: [true, "Please add the product name"]
    },
    image:[{
        image:String
    }],
    mainImage:{
        type:String,
    },
    dropdown:{
        type:mongoose.Types.ObjectId,
    },
    
},
    {
        timestamps: true
    }
);

export const Products = mongoose.model("Products", productSchema);