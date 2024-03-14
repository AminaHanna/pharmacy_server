import { Router } from "express"
import { createCategory, getCategory } from "../Controllers/categoriesController.js"

const router = Router()

router.post('/', createCategory);
router.get('/', getCategory)

export default router;