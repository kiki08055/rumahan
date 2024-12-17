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
  
router.get(
  '/transactions/:id',
  authMiddleware.authenticateToken.bind(authMiddleware),
  authMiddleware.authorizeRole(['admin']).bind(authMiddleware), 
   transactionsController.getTransactionsById.bind(transactionsController))

router.put('/transactions/:id', 
  authMiddleware.authenticateToken.bind(authMiddleware),
  authMiddleware.authorizeRole(['admin']).bind(authMiddleware), 
  transactionsController.updateTransactions.bind(transactionsController))

router.get(
  '/transactions',
  authMiddleware.authenticateToken.bind(authMiddleware),
  authMiddleware.authorizeRole(['admin']).bind(authMiddleware), 
  transactionsController.getAllTransactions.bind(transactionsController))

router.get(
  '/transactions-history', 
  authMiddleware.authenticateToken.bind(authMiddleware),
  authMiddleware.authorizeRole(['admin']).bind(authMiddleware),
  transactionsController.getTransactionHistory.bind(transactionsController))

router.delete(
  '/transactions',
  authMiddleware.authenticateToken.bind(authMiddleware),
  authMiddleware.authorizeRole(['admin']).bind(authMiddleware), 
   transactionsController.deleteTransactions.bind(transactionsController))

export default router;