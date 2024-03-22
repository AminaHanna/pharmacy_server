import mongoose from "mongoose";
import { Banner } from "../model/bannerModel.js";
import { Banner2 } from "../model/banner2Model.js";
import { Banner3 } from "../model/banner3Model.js";


export const createBanner = async (req, res) => {
    try {
        // const { title, description, percentage, rate, offerRate } = req.body;

        // if(!title) {
        //     return res.status(400).json({ message: "title is missing" });
        // }
        // if(!description) {
        //     return res.status(400).json({ message: "description is missing" });
        // }
        // if(!percentage) {
        //     return res.status(400).json({ message: "timeline is missing" });
        // }
        // if(!rate) {
        //     return res.status(400).json({ message: "rate is missing" });
        // }
        // if(!offerRate) {
        //     return res.status(400).json({ message: "offer-rate is missing" });
        // }
       
        const isBannerExist = await Banner.findOne({ name:req.body.title});

        // if(!!isBannerExist) {
        //     return res.status(400).json({ message: "banner name is existing...Please enter another one" });
        // }

        const newBanner = new Banner(req.body)

        const createdBanner = await newBanner.save();
        return res.status(201).json({ data: createdBanner, message: "Successfully inserted banner data into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getBanner = async (req, res) => {
    const Banners = await Banner.find()

    if(Banners.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Banner: Banners });
    }
}


export const getBannerById = async (req, res) => {
    const response = await mongoose.connection.collection("banner").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Banner: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteBannerById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Banner.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateBannerById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Banner.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}


// banner2

export const createBanner2 = async (req, res) => {
    try {
        const isBannerExist = await Banner2.findOne({ name:req.body.title});


        const newBanner = new Banner2(req.body)

        const createdBanner = await newBanner.save();
        return res.status(201).json({ data: createdBanner, message: "Successfully inserted banner data into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getBanner2 = async (req, res) => {
    const Banners = await Banner2.find()

    if(Banners.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Banner2: Banners });
    }
}


export const getBanner2ById = async (req, res) => {
    const response = await mongoose.connection.collection("banner2").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Banner: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteBanner2ById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Banner2.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateBanner2ById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Banner2.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}

// banner 3

export const createBanner3 = async (req, res) => {
    try {
        const isBannerExist = await Banner3.findOne({ name:req.body.title});

        const newBanner = new Banner3(req.body)

        const createdBanner = await newBanner.save();
        return res.status(201).json({ data: createdBanner, message: "Successfully inserted banner data into db" });
    } catch (error) {
        return res.status(404).json({ message: error.message || 'error' });
    }
}


export const getBanner3 = async (req, res) => {
    const Banners = await Banner3.find()

    if(Banners.length === 0) {
        return res.status(404).json("no entries yet");
    } else {
        return res.status(200).json({ Banner3: Banners });
    }
}


export const getBanner3ById = async (req, res) => {
    const response = await mongoose.connection.collection("banner3").findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });

    if(response) {
        return res.status(200).json({ Banner3: response });
    }else {
        return res.status(404).json("no entries yet");
    }
}


export const deleteBanner3ById = async (req, res) => {
    try {
        if(!req.params.id) {
            return res.status(400).json({ message: "error while deleting!!!" });
        }
        await Banner3.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "deleted" });
    } catch(error) {
        return res.status(200).json({ message: error.message || 'error' });
    }
}


export const updateBanner3ById = async (req, res) => {
    console.log(req.params.id);

    try {
        if(!req.params.id) {
            return res.status(400).json({ message: 'error while deleting!' });
        }

        await Banner3.findByIdAndUpdate(req.params.id,{$set:req.body});
        return res.status(200).json({ message: "updated" });
    } catch (error) {
        return res.status(400).json({ message: error.message || "updation error" })
    }
}