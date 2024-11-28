import { Router } from "express";
import { KasirController } from "../controllers/kasir.controller";

const router = Router();
const kasirController = new KasirController();

router.post('/products', kasirController.createProduct.bind(kasirController))

router.get('/products', kasirController.getAllProducts.bind(kasirController))
//router.get('/products', kasirController.createProduct.bind(kasirController))
router.get('/products/:id', kasirController.createProduct.bind(kasirController))
router.put('/products/:id', kasirController.updateProduct.bind(kasirController))
router.delete('/products/:id', kasirController.deletedProduct.bind(kasirController))
router.post('/transactions', kasirController.createTransaction.bind(kasirController))
router.post('/kasirs', kasirController.createKasir.bind(kasirController))

export default router;