import { Router } from "express"
import { createBanner3, deleteBanner3ById, getBanner3, getBanner3ById, updateBanner3ById } from "../Controllers/bannerController.js";

const router = Router()

router.post('/', createBanner3);
router.get('/', getBanner3);
router.get('/:id', getBanner3ById);
router.put('/:id', updateBanner3ById);
router.delete('/:id', deleteBanner3ById);


export default router;