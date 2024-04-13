import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    productsArray: {
        type:Array
    }
},
    {
        timestamps: true
    }
);
export const Order= mongoose.model("Order", orderSchema);