import express from "express";
import connectDb from "./config/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import adminRoute from "./Routes/adminRoute.js";
import userRoute from "./Routes/userRoute.js";
import categoryRoute from "./Routes/categoryRoute.js";
import productRoute from "./Routes/productRoute.js";
import cardRoute from "./Routes/cardRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import bannerRoute from "./Routes/bannerRoute.js";
import banner2Route from "./Routes/banner2Route.js";
import banner3Route from "./Routes/banner3Route.js";
import cartRouter from "./Routes/cartRouter.js";




const app = express();
connectDb();
dotenv.config();
app.use(cors());
app.use(express.json({limit:"100mb"}));


app.use('/api/admin', adminRoute)
app.use('/api/user', userRoute)

app.use('/api/products', productRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/cards', cardRoute)
app.use('/api/blogs', blogRoute)
app.use('/api/banner', bannerRoute)
app.use('/api/banner2', banner2Route)
app.use('/api/banner3', banner3Route)
app.use('/api/cart', cartRouter)



app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on PORT ${process.env.PORT || 3000}`);
})