import { Router } from "express"
import { createBanner, createBanner2, createBanner3, deleteBanner2ById, deleteBanner3ById, deleteBannerById, getBanner, getBanner2, getBanner2ById, getBanner3, getBanner3ById, getBannerById, updateBanner2ById, updateBanner3ById, updateBannerById } from "../Controllers/bannerController.js";

const router = Router()

router.post('/', createBanner);
router.get('/', getBanner);
router.get('/:id', getBannerById);
router.put('/:id', updateBannerById);
router.delete('/:id', deleteBannerById);


router.post('/', createBanner2);
router.get('/', getBanner2);
router.get('/:id', getBanner2ById);
router.put('/:id', updateBanner2ById);
router.delete('/:id', deleteBanner2ById);


router.post('/', createBanner3);
router.get('/', getBanner3);
router.get('/:id', getBanner3ById);
router.put('/:id', updateBanner3ById);
router.delete('/:id', deleteBanner3ById);


export default router;