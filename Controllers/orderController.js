import mongoose from "mongoose";
import { Order } from "../model/orderModel.js";
import { Payment } from "../model/paymentModel.js";
import { Cart } from "../model/cartModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import express from "express";


// const razorpay = new Razorpay({
//     key_id: 'rzp_test_H0JW7KXTkvpj4p',
//     key_secret: 'r5PVx9y34zYDmFybBsgK61iE'
//   })


export const createOrder =async (req, res) => {
    try {

        const { name, address, contact, city, pincode } = req.body

        if (!name) {
            return res.status(400).json({ message: "Name is missing" });
        }
        if (!address) {
            return res.status(400).json({ message: "Address is missing" });
        }
        if (!contact) {
            return res.status(400).json({ message: "contact is missing" });
        }
        if (!city) {
            return res.status(400).json({ message: "city is missing" });
        }
        if (!pincode) {
            return res.status(400).json({ message: "pincode is missing" });
        }


        if(req.body.mode === 'online'){
            const razorpay = new Razorpay({
                key_id: 'rzp_test_tjQX0dLAwK5ZRe',
                key_secret: 'l6PExsujC6D9OioOyleXuR1M'
              })
    
              const options = {
                amount: 1000*100,
                currency: "INR",
                receipt: `12345ABCD${Math.floor(Math.random())}`,
                payment_capture: 1
            };
    
    
            try {
                const response = await razorpay.orders.create(options)
                res.json({
                    order_id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                })
            } catch (err) {
               res.status(400).send('Not able to create order. Please try again!');
            }
        }else{


            if(req.body.type==="cart"){

                const cartsss = await Cart.find({userId:new mongoose.Types.ObjectId(req.body.userId)})
                console.log(cartsss,"ord");
                let productsArray = []
                for( let obj of cartsss){
                    productsArray.push(obj.productId)
               }
               console.log(productsArray,"array");
    
                const newOrder = new Order({...req.body,productsArray:productsArray})
                const orderSaved = await newOrder.save() 
                const newPayment = new Payment({...req.body,orderId:orderSaved._id})
                await Order.findByIdAndUpdate(orderSaved._id,{$set:{paymentId:newPayment._id}})
                const paymentSaved = await newPayment.save();
                // res.json(newOrder);
                for( let obj of cartsss){
                    await Cart.findByIdAndDelete(obj._id)
               }

                return res.status(201).json({ message: 'order success' });
                
            } else {
                 
            const newOrder = new Order(req.body)
            
            const orderSaved = await newOrder.save() 
            const newPayment = new Payment({...req.body,orderId:orderSaved._id})
            await Order.findByIdAndUpdate(orderSaved._id,{$set:{paymentId:newPayment._id}})
            const paymentSaved = await newPayment.save();
            
            return res.status(201).json({ message: 'order success' });
            }

            

        }

        
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });      
    }
}

export const getOrders = async (req, res) => {

        const orders= await Order.aggregate([
            {
                $match:{userId:new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup:{
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"productInformation"
                }
            },
            {
                $unwind:"$productInformation" 
            },
        ])

        const count= await Order.countDocuments();

    if (orders.length === 0) {
        return res.status(200).json({ data:orders });
    } else {
        return res.status(200).json({ data: orders,count:count });
    }
}


export const getOrdersByUserId = async (req, res) => {

    const orders= await Order.aggregate([
        {
            $match:{userId:new mongoose.Types.ObjectId(req.params.id) }
        },
        {
            $lookup:{
                from:"products",
                localField:"productId",
                foreignField:"_id",
                as:"productInformation"
            }
        },
        {
            $unwind:"$productInformation" 
        },
        {
            $lookup:{
                from:"payments",
                localField:"paymentId",
                foreignField:"_id",
                as:"paymentInformation"
            }
        },
        {
            $unwind:"$paymentInformation" 
        },
    ])

    const count= await Order.countDocuments();

if (orders.length === 0) {
    return res.status(200).json({ data:orders });
} else {
    return res.status(200).json({ data: orders });
}
}


export const getById = async (req, res) => {
    const orders = await Order.findById(req.params.id)

    if(orders) {
        return res.status(200).json({ data: orders });
    }else {
        return res.status(404).json("no entries yet");
    }
};


export const orderApproved = async (req, res) => {
    try {
        const orderId = req.params.id;

        // console.log(orderId,"orderid");
        
        const updatedOrder = await Order.findByIdAndUpdate(orderId,{ $set: { status: 'approved' } },{ new: true });
        

        const updatedPayment = await Payment.findByIdAndUpdate(updatedOrder.paymentId,{ $set: { status: 'approved' } },{ new: true })

        // console.log(updatedPayment,"updated order");
        res.json(updatedPayment);

    } catch (error) {
        console.log("Error while approving:", error);
    }
};


export const orderPending = async (req, res) => {
    try {
        const orderId = req.params.id;

        const updatedOrder = await Order.findByIdAndUpdate(orderId,{ $set: { status: 'pending' } },{ new: true });
        
        const updatedPayment = await Payment.findByIdAndUpdate(updatedOrder.paymentId,{ $set: { status: 'pending' } },{ new: true })

        res.json(updatedPayment);

    } catch (error) {
        console.log("Error while approving:", error);
    }
};


export const orderShipped = async (req, res) => {
    try {
        const orderId = req.params.id;

        
        const updatedOrder = await Order.findByIdAndUpdate(orderId,{ $set: { status: 'shipped' } },{ new: true });

        const updatedPayment = await Payment.findByIdAndUpdate(updatedOrder.paymentId,{ $set: { status: 'shipped' } },{ new: true })

        res.json(updatedPayment);

    } catch (error) {
        console.log("Error while approving:", error);
    }
};


export const orderDelivered = async (req, res) => {
    try {
        const orderId = req.params.id;
        
        const updatedOrder = await Order.findByIdAndUpdate(orderId,{ $set: { status: 'delivered' } },{ new: true });
        
        const updatedPayment = await Payment.findByIdAndUpdate(updatedOrder.paymentId,{ $set: { status: 'delivered' } },{ new: true })

        res.json(updatedPayment);

    } catch (error) {
        console.log("Error while approving:", error);
    }
};



// export const payment = async (req,res)=>{

//     const secret_key = 'l6PExsujC6D9OioOyleXuR1M'

// const {orderId,paymentId,signature  }  = req.body.orderDetails
//     console.log(req.body.orderDetails);

//     let newww = orderId + "|" + paymentId
// const data = crypto.createHmac('sha256', secret_key).update(newww.toString())

//    const digest = data === signature

//    console.log(digest,'dd');

// if (digest === req.headers['x-razorpay-signature']) {

//        console.log('request is legit')

//        //We can send the response and store information in a database.

//        res.json({

//            status: 'ok'

//        })

//     } else {
//        res.status(400).send('Invalid signature');
//     }
// }



export const payment = async (req, res) => {
    try {
        const secret_key = 'l6PExsujC6D9OioOyleXuR1M';
        const { orderId, paymentId, signature } = req.body.orderDetails;
        const expectedSignature = crypto.createHmac('sha256', secret_key).update(orderId + "|" + paymentId).digest('hex');

        if (signature === expectedSignature) {
            console.log('Request signature is valid');

            // Update order status or perform other actions here

            return res.status(200).json({ status: 'ok' });
        } else {
            console.log('Invalid signature');
            return res.status(400).send('Invalid signature');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        return res.status(500).send('Error processing payment');
    }
}