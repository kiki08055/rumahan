import { Request, Response, NextFunction } from "express";
import { TransactionService } from "../services/transactions.service";
import { transactionSchema } from "../validators/validateProducts";
import { Transactions } from "@prisma/client";

export class TransactionsController {
    private transactionService: TransactionService

    constructor() {
        this.transactionService = new TransactionService();
    }
    async getAllTransactions(req: Request, res: Response) {
        const transactions = await this.transactionService.getAllTransactions();
        if (transactions.length > 0) {
            res.status(200).send({
                message: 'Transactions retrieved successfully',
                data: transactions,
                status: res.statusCode
            })
        } else {
            res.status(404).send({
                message: 'transaction not found'
            })
        }
    }
    async getTransactionsById(req: Request, res: Response) {
        const { id } = req.params;
        const transactions = await this.transactionService.getTransactionsById(parseInt(id));
        if (transactions) {
            res.status(200).send({
                data: transactions,
                status: res.statusCode
            })
        } else {
            res.status(404).send({
                message: "data not found",
                status: res.statusCode
            })
        }
    }
    async createMultipleTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = transactionSchema.array().safeParse(req.body);
    
            if (!validatedData.success) {
                const errors = validatedData.error.errors.map((error) => ({
                    code: "01",
                    field: error.path.join("."),
                    message: error.message,
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
    
            const newTransactions = await this.transactionService.createMultipleTransactions(
                transactions, 
                payment_method
            );
    
            res.status(201).send({
                message: "Transactions successfully created",
                data: newTransactions,
                status: 201,
            });
            return;
        } catch (error) {
            next(error);
        }
    }
    
    async updateTransactions(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updateTransactions = await this.transactionService.updateTransactions(id, req.body);
        if (updateTransactions) {
            res.status(201).send({
                message: 'Update Transactions success',
                data: updateTransactions,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'Failed to Transactions ',
                status: res.statusCode
            });
        }
    }
}