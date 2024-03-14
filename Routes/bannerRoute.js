import { Router } from "express"
import { createBanner, getBanner } from "../Controllers/bannerController.js";

const router = Router()

router.post('/', createBanner);
router.get('/', getBanner);

export default router;