import { Router } from "express"
import { addToWishlist, getById, listWishlist, removeWishlist } from "../Controllers/wishlistController.js";

const router = Router()

router.post('/addToWishlist', addToWishlist);
router.get('/list/:id', listWishlist);
router.get('/:id', getById);
router.get('/remove-wishlist/:userId/:productId', removeWishlist);


export default router;