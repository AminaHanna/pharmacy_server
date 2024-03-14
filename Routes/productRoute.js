import { Router } from 'express'
import multer from 'multer'
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../Controllers/productController.js';
import mongoose from 'mongoose';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;
