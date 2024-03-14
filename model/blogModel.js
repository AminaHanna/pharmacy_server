import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the title for blog"]
    },
    description: {
        type: String,
        required: [true, "Please add the title for blog"]
    }
},
    {
        timestamps: true
    }
);
 export const Blog = mongoose.model("Blog", blogSchema)