import mongoose from "mongoose";
import { Products } from "../model/productModel.js";


export const createProduct = async (req, res) => {
    try {
        const { name, details, price, delivery } = req.body;

        if(!name) {
            return res.status(400).json({ message: "product name is missing" });
        }
        if(!details) {
            return res.status(400).json({ message: "description is missing" });
        }
        if(!price) {
            return res.status(400).json({ message: "price is missing" });
        }
        if(!delivery) {
            return res.status(400).json({ message: "quantity is missing" });
        }

        const isProductExist = await Products.findOne({ name: name});

        if(!!isProductExist) {
            return res.status(400).json({ message: "product name is existing...Please enter another one" });
        }

        const newProduct = new Products({
            name:name,
            details:details,
            price:price,
            delivery:delivery
        })

        const createdProduct = await newProduct.save();
        return res.status(201).json({ data: createdProduct, message: "Successfully inserted product into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getProducts = async (req, res) => {
    const Product = await Products.find()

    if(Product.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ products: Product });
    }
}


export const getProductById = async (req, res) => {
    const response = await mongoose.connection.collection("product").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Product: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteProductById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Products.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateProductById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Products.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}