import mongoose from "mongoose";
import { Wishlist } from "../model/wishlistModel.js";


export const addToWishlist = async (req, res) => {
    try {
 
        const newWishlist = new Wishlist(req.body)

        const createWishlist = await newWishlist.save();
        return res.status(201).json({ data: createWishlist, message: "Successfully inserted wishlist into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
};


export const listWishlist = async (req, res) => {
    const wishlist = await Wishlist.aggregate([
        {
            $match:{ userId : new mongoose.Types.ObjectId(req.params.id)}
        },
        {
            $lookup:{
                from:"products",
                localField:"productId",
                foreignField:"_id",
                as:"productInfo"
            }
        },
        {
            $unwind:"$productInfo" 
        },
    ])


    if(wishlist.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ data: wishlist });
    }
};


export const getById = async (req, res) => {
    const wishlist = await Wishlist.findById(req.params.id)

    if(wishlist) {
        return res.status(200).json({ data: wishlist });
    }else {
        return res.status(404).json("no entries yet");
    }
};

export const removeWishlist = async (req, res) => {
    try {
        // Find and remove the cart item by productId and userId
        const removedItem = await Wishlist.findOneAndDelete(
            { productId: new mongoose.Types.ObjectId(req.params.productId), userId: req.params.userId }
        );

        if (!removedItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }

        return res.status(200).json({ data: removedItem, message: 'Item removed from Wishlist successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};