import { Router } from "express"
import { getAdmin, getAllAdmin, signIn, signUp,updateAdminProfile } from "../Controllers/adminController.js"
import { verifyAdminToken } from "../middleware/AdminTokenVerify.js";

const router = Router()

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', verifyAdminToken, getAdmin);
router.get('/', verifyAdminToken, getAllAdmin);
router.put('/profile', verifyAdminToken, updateAdminProfile);

export default router;