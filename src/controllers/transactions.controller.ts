import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../services/transactions.service"
import { transactionSchema } from "../validators/validateProducts";

export class TransactionsController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }

    async getAllTransactions(req: Request, res: Response) {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            if (transactions.length > 0) {
                res.status(200).send({
                    message: 'Transactions retrieved successfully',
                    data: transactions,
                    status: res.statusCode,
                });
            } else {
                res.status(404).send({
                    message: 'No transactions found',
                });
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            res.status(500).send({
                message: 'Error fetching transactions',
            });
        }
    }

    async getTransactionsById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const transaction = await this.transactionService.getTransactionsById(Number(id));
            if (transaction) {
                res.status(200).send({
                    data: transaction,
                    status: res.statusCode,
                });
            } else {
                res.status(404).send({
                    message: 'Transaction not found',
                    status: res.statusCode,
                });
            }
        } catch (error) {
            console.error("Error fetching transaction by ID:", error);
            res.status(500).send({
                message: 'Error fetching transaction by ID',
            });
        }
    }

    async createMultipleTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = transactionSchema.array().safeParse(req.body);
    
            if (!validatedData.success) {
                const errors = validatedData.error.errors.map((error) => ({
                    code: "01",
                    field: error.path.join("."),
                    minimum: error.message.includes("kosong") ? "1" : undefined,
                }));
    
                res.status(400).send({
                    message: "Validation failed",
                    details: errors,
                    status: 400,
                });
                return;
            }
    
            const transactions = validatedData.data.map((item) => ({
                customerId: Number(item.customerId),
                productId: Number(item.productId),
                quantity: Number(item.quantity),
                kasirId: Number(item.kasirId),
                transactionDate: item.transactionDate,
                total_product: Number(item.quantity),
                created_at: new Date(),
            }));
    
            const payment_method = req.body.payment_method || "cash";
    
            // Memanggil fungsi untuk membuat transaksi di PostgreSQL dan MongoDB
            const newTransactions = await this.transactionService.createMultipleTransactions(
                transactions, 
                payment_method
            );
    
            res.status(201).send({
                message: "Transactions successfully created",
                data: newTransactions,
                status: 201,
            });
        } catch (error) {
            console.error("Error creating multiple transactions:", error);
            next(error);
        }
    }

    // Fungsi untuk mendapatkan riwayat transaksi yang ada di MongoDB
    async getTransactionHistory(req: Request, res: Response) {
        const { limit = 10, page = 1, customerId, payment_method, startDate, endDate } = req.query;

        const filters: any = {};
        if (customerId) filters.customerId = customerId;
        if (payment_method) filters.payment_method = payment_method;
        if (startDate) filters.startDate = new Date(startDate as string);
        if (endDate) filters.endDate = new Date(endDate as string);

        try {
            // Mengambil riwayat transaksi dari MongoDB dengan filter dan paginasi
            const transactions = await this.transactionService.getTransactionHistory(
                Number(limit),
                Number(page),
                filters
            );

            res.status(200).json({
                success: true,
                page: Number(page),
                limit: Number(limit),
                data: transactions
            });
        } catch (error) {
            console.error("Error fetching transaction history:", error);
            res.status(500).json({
                success: false,
                message: "Error fetching transaction history",
            });
        }
    }
    async updateTransactions(req: Request, res: Response){
        const id = Number(req.params.id);
        const updatedTransaction = await this.transactionService.updateTransactions(id, req.body);
        if (updatedTransaction) {
            res.status(201).send({
                message: 'Transaction updated successfully',
                status: res.statusCode,
                data: updatedTransaction,
            });
        } else {
            res.status(404).send({
                message: 'Transaction not found',
                status: res.statusCode,
            });
        }
    }

    async deleteTransactions(req: Request, res: Response) {
      const id = Number(req.params.id);
      const deletedTransaction = await this.transactionService.deleteTransactions(id);
      if (deletedTransaction) {
        res.status(200).send({
          message: 'Transaction deleted successfully',
          status: res.statusCode,
        });
      } else {
        res.status(400).send({
          message: 'Failed to delete transaction',
          status: res.statusCode,
        });
      }
    }
}
