import { Router } from 'express'
import { createProduct,searchProduct, deleteProductById, getproductsByCategory,getProductById, getProducts, updateProductById } from '../Controllers/productController.js';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/search', searchProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);
router.get('/getprroducts-bycat/:id', getproductsByCategory);


export default router;
