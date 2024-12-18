import { Router } from "express";
import { KasirController } from "../controllers/kasir.controller";
import { TransactionsController } from "../controllers/transactions.controller";
const router = Router();
const kasirController = new KasirController();
const transactionsController = new TransactionsController()

router.post('/products', kasirController.createProduct.bind(kasirController));
router.get('/products', kasirController.getAllProducts.bind(kasirController))
router.get('/products/:id', kasirController.getProductById.bind(kasirController))
router.put('/products/:id', kasirController.updateProduct.bind(kasirController))
router.delete('/products/:id', kasirController.deletedProduct.bind(kasirController))
router.get('/products/expired', kasirController.getExpiredProducts.bind(kasirController))
router.post('/kasirs', kasirController.createKasir.bind(kasirController))
router.get('/kasirs', kasirController.getAllKasirs.bind(kasirController))

export default router;