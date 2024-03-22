import { Router } from "express"
import { createBlog, deleteBlogById, getBlog, getBlogById, updateBlogById } from "../Controllers/blogController.js";

const router = Router()

router.post('/', createBlog);
router.get('/', getBlog);
router.get('/:id', getBlogById);
router.put('/:id', updateBlogById);
router.delete('/:id', deleteBlogById);

export default router;