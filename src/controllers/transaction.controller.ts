import { TransactionHistoryService } from "../services/transactionHistory";
import { Request, Response } from "express";


export class TransactionHistoryController {
    private transactionHistoryService: TransactionHistoryService;

    constructor() {
        // Mendeklarasikan dan menginisialisasi service di dalam konstruktor
        this.transactionHistoryService = new TransactionHistoryService();
    }    
   
    async createTransactions(req: Request, res: Response): Promise<void> {
        try {
            const { transactions, payment_method } = req.body;
    
            if (!Array.isArray(transactions) || transactions.length === 0) {
                res.status(400).send({ message: "Transactions should be a non-empty array." });
                return;
            }

            // for (const transaction of transactions) {
            //     if (!transaction.customer_id) {
            //         res.status(400).send({ message: "Each transaction must have a customer_id." });
            //         return; 
            //     }
            // }
    
            const result = await this.transactionHistoryService.createMultipleTransactions(
                transactions,
                payment_method
            );
    
            res.status(201).send({ message: "Transactions created successfully", result });
        } catch (error: any) {
            console.error("Error creating transactions:", error);
            res.status(500).send({ message: error.message });
        }
    }
    async getTransactions(req: Request, res: Response) {
        const { limit = 10, page = 1, customerId, payment_method, startDate, endDate } = req.query;

        // Mengonversi string ke Date jika perlu
        const filters: any = {};
        if (customerId) filters.customerId = customerId;
        if (payment_method) filters.payment_method = payment_method;
        if (startDate) filters.startDate = new Date(startDate as string);
        if (endDate) filters.endDate = new Date(endDate as string);

        try {
            // Mendapatkan histori transaksi berdasarkan filter dan paginasi
            const transactions = await this.transactionHistoryService.getTransactionHistory(
                Number(limit),
                Number(page),
                filters
            );

            // Mengirimkan response
            res.status(200).json({
                success: true,
                page: Number(page),
                limit: Number(limit),
                data: transactions
            });
        } catch (error: any) {
            console.error("Error:", error);
            res.status(500).json({
                success: false,
                message: "Error fetching transactions",
                error: error.message
            });
        }
    }
} 