import mongoose from "mongoose";
import { Cart } from "../model/cartModel.js";


export const addToCart = async (req, res) => {
    try {
 
        const newCart = new Cart(req.body)

        const createCart = await newCart.save();
        return res.status(201).json({ data: createCart, message: "Successfully inserted cart into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const listCartByUser = async (req, res) => {
    console.log(req.params.id,'req.body.userId');
    const cart = await Cart.aggregate([
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


    
    // if(!cart){
    //     return res.status(400).json({message:'cart not found'})
    // }

    // console.log(cart)
    // return res.status(200).json({data:cart})



    if(cart.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ data: cart });
    }
}


export const getById = async (req, res) => {
    const cart = await Cart.findById(req.params.id)

    if(cart) {
        return res.status(200).json({ data: cart });
    }else {
        return res.status(404).json("no entries yet");
    }
}

export const incrementCartQuantity = async (req, res) => {
    try {
        const cartItem = await Cart.findOneAndUpdate(
            { productId: new mongoose.Types.ObjectId(req.params.productId),userId:new mongoose.Types.ObjectId(req.params.userId) }, // Assuming req.user contains the user's ID
            { $inc: { quantity: 1 } }, // Increment quantity by 1
            { new: true } // Return the updated document
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({ data: cartItem, message: 'Quantity incremented successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};
export const removeCartQuantity = async (req, res) => {
    try {
        // Find and remove the cart item by productId and userId
        const removedItem = await Cart.findOneAndDelete(
            { productId: new mongoose.Types.ObjectId(req.params.productId), userId: req.params.userId } // Assuming req.user contains the user's ID
        );

        if (!removedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({ data: removedItem, message: 'Item removed from cart successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

export const decrementCartQuantity  = async (req, res) => {
    try {
        const cartItem = await Cart.findOneAndUpdate(
            { productId: new mongoose.Types.ObjectId(req.params.productId),userId:new mongoose.Types.ObjectId(req.params.userId) }, // Assuming req.user contains the user's ID
            { $inc: { quantity: -1 } }, // Increment quantity by 1
            { new: true } // Return the updated document
        );

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        return res.status(200).json({ data: cartItem, message: 'Quantity incremented successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
};



// export const deleteCategoryById = async (req, res) => {
//     try {
//         if(!req.params.id) {
//             return res.status(400).json({ message: "error while deleting!!!" });
//         }
//         await Category.findByIdAndDelete(req.params.id)
//         return res.status(200).json({ message: "deleted" });
//     } catch(error) {
//         return res.status(200).json({ message: error.message || 'error' });
//     }
// }


// export const updateCategoryById = async (req, res) => {
//     try {
//         if(!req.params.id) {
//             return res.status(400).json({ message: 'error while deleting!' });
//         }

//         await Category.findByIdAndUpdate(req.params.id,{$set:req.body});
//         return res.status(200).json({ message: "updated" });
//     } catch (error) {
//         return res.status(400).json({ message: error.message || "updation error" })
//     }
// }