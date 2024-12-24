import { Router } from "express";
import { KasirController } from "../controllers/kasir.controller";
import { AuthenticateJwtMiddleware } from "../middlewares/auth.middleware";
const router = Router();
const kasirController = new KasirController();
const authMiddleware = new AuthenticateJwtMiddleware()

router.post(
    '/products',
    authMiddleware.authenticateToken.bind(authMiddleware),
    authMiddleware.authorizeRole(['admin']).bind(authMiddleware),
    kasirController.createProduct.bind(kasirController));
router.get('/products', kasirController.getAllProducts.bind(kasirController))
router.get('/products/:id', kasirController.getProductById.bind(kasirController))
router.put(
    '/products/:id',
    authMiddleware.authenticateToken.bind(authMiddleware),
    authMiddleware.authorizeRole(['admin']).bind(authMiddleware),
    kasirController.updateProduct.bind(kasirController))
router.delete('/products/:id', kasirController.deletedProduct.bind(kasirController))
router.get('/products/expired', kasirController.getExpiredProducts.bind(kasirController))
router.post('/kasirs', kasirController.createKasir.bind(kasirController))
router.get('/kasirs', kasirController.getAllKasirs.bind(kasirController))

export default router;