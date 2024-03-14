import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the product id"]
    }
},
    {
        timestamps: true
    }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);