import { Router } from "express";
import { createOrder, getById, getOrders,getOrdersByUserId, orderApproved, orderPending, orderShipped, orderDelivered,payment } from "../Controllers/orderController.js";

const router = Router();

router.post('/', createOrder);
router.post('/payment', payment);
router.get('/:id', getOrders);
router.post('/approved/:id', orderApproved);
router.post('/pending/:id', orderPending);
router.post('/shipped/:id', orderShipped);
router.post('/delivered/:id', orderDelivered);
router.get('/:id', getById);
router.get('/user/:id', getOrdersByUserId);

export default router;