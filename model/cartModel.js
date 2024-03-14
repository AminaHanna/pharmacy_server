import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add user id"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add Product id"]
    },
    totalPrice: {
        type: String,
        required: [true, "Please add price"]
    },
},
    {
        timestamps: true
    }
);

export const Cart = mongoose.model("Cart", cartSchema);