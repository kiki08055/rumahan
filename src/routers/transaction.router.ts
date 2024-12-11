import { Router } from "express";
import { TransactionsController } from "../controllers/transactions.controller";
import { AuthenticateJwtMiddleware } from "../middlewares/auth.middleware";
const router = Router();
const transactionsController = new TransactionsController()
const authMiddleware = new AuthenticateJwtMiddleware
router.post(
    '/transactions', 
    authMiddleware.authenticateToken.bind(authMiddleware),
    authMiddleware.authorizeRole(['admin']).bind(authMiddleware),
    transactionsController.createMultipleTransactions.bind(transactionsController)
  );
  
router.get('/transactions/:id', transactionsController.getTransactionsById.bind(transactionsController))
router.put('/transactions/:id', transactionsController.updateTransactions.bind(transactionsController))

export default router;