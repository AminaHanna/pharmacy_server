import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the firstname"],
    },
    address: {
        type: String,
        required: [true, "Please add the lastname"],
    },
    contact: {
        type: String,
        required: [true, "Please add the email address"],
    },
    city: {
        type: String,
        required: [true, "Please add the user password"],
    },
    pincode: {
        type: String,
        required: [true, "Please add the user password"],
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId
    },
    mode:{
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "shipped","accepted","approved", "delivered",'processing'],
        default: "pending",
    },
    amount:{
        type:String
    }
},
    {
        timestamps: true,
    }
);

export const Payment = mongoose.model("Payment", paymentSchema);
