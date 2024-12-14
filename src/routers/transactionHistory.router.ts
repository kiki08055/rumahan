import { Router } from "express";
import { TransactionHistoryController } from "../controllers/transaction.controller";
import { AuthenticateJwtMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const transactionHistoryController = new TransactionHistoryController();
const authMiddleware = new AuthenticateJwtMiddleware();

router.post(
    '/transaction-history',
    authMiddleware.authenticateToken.bind(authMiddleware),
    authMiddleware.authorizeRole(['admin']).bind(authMiddleware), 
    transactionHistoryController.createTransactions.bind(transactionHistoryController)
);
router.get(
    '/transactions',authMiddleware.authenticateToken.bind(authMiddleware),
    authMiddleware.authorizeRole(['admin']).bind(authMiddleware),
    transactionHistoryController.getTransactions.bind(transactionHistoryController)
)



export default router;
