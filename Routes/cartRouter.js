import { Router } from "express"
import { addToCart, listCartByUser, getAll,getById,decrementCartQuantity,incrementCartQuantity,removeCartQuantity } from "../Controllers/cartController.js";

const router = Router()

router.post('/addToCart', addToCart);
router.get('/listCart/:id', listCartByUser);
router.get('/:id', getById);
router.get('/viewAll', getAll);


router.get('/decrement-cart/:userId/:productId', decrementCartQuantity);
router.get('/remove-cart/:userId/:productId', removeCartQuantity);
router.post('/increment-cart/:userId/:productId', incrementCartQuantity);

// router.put('/:id', updateById);
// router.delete('/:id', deleteById);

export default router;