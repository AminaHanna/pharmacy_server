import { Router } from "express"
import { createBlog, getBlog } from "../Controllers/blogController.js";

const router = Router()

router.post('/', createBlog);
router.get('/', getBlog);

export default router;