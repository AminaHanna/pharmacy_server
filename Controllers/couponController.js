import mongoose from "mongoose";
import { Coupon } from "../model/couponModel.js";


export const createCard = async (req, res) => {
    try {
       
        const isCardExist = await Coupon.findOne({ name:req.body.title});

        const newCard = new Coupon(req.body)

        const createdCard = await newCard.save();
        return res.status(201).json({ data: createdCard, message: "Successfully inserted card data into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getCard = async (req, res) => {
    const Cards = await Coupon.find()

    if(Cards.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Coupon: Cards });
    }
}


export const getCardById = async (req, res) => {
    const response = await mongoose.connection.collection("coupon").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Coupon: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteCardById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Coupon.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateCardById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Coupon.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}