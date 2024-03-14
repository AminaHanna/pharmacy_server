import { Router } from "express"
import { createCard, getCard } from "../Controllers/offerCardController.js";

const router = Router()

router.post('/', createCard);
router.get('/', getCard);

export default router;