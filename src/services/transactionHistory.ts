import { PrismaClient, Transactions } from "@prisma/client";
import { TransactionHistoryModel } from "../models/transactionHistory";

interface TransactionWithReceipts extends Omit<Transactions, 'transaction_id'> {
    receipts?: { receipt_id: number; amount: number; date: Date; payment_method: string }[];
}

export class TransactionHistoryService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async saveTransactionToHistory(transactionData: any) {
        console.log("Saving transaction to history:", transactionData);
        return TransactionHistoryModel.create(transactionData);
    }

    async createTransaction(transaction: TransactionWithReceipts) {
        if (!transaction.customerId) {
            throw new Error("customerId is required");
        }

        const newTransaction = await this.prisma.transactions.create({
            data: {
                customerId: transaction.customerId,
                productId: transaction.productId,
                quantity: transaction.quantity,
                kasirId: transaction.kasirId,
                transactionDate: transaction.transactionDate,
                total_product: transaction.total_product || 0,
                receipts: {
                    create: (transaction.receipts || []).map((receipt) => ({
                        amount: receipt.amount,
                        date: receipt.date,
                        payment_method: receipt.payment_method,
                    })),
                },
            },
        });
        return newTransaction;
    }

    async createMultipleTransactions(transactions: TransactionWithReceipts[], payment_method: string) {
        if (!Array.isArray(transactions) || transactions.length === 0) {
            throw new Error('Transactions should be a non-empty array.');
        }

        const results = await Promise.all(
            transactions.map(async (transaction, index) => {
                const newTransaction = await this.createTransaction(transaction);

                const historyData = {
                    ...newTransaction,
                    payment_method,
                    receipts: transaction.receipts || [],
                };

                console.log(`Saving transaction ${index + 1} to history:`, historyData);
                await this.saveTransactionToHistory(historyData);
                return newTransaction;
            })
        );

        console.log('All transactions processed successfully:', results);
        return results;
    }

    async getTransactionHistory(
        limit: number = 10,
        page: number = 1,
        filters: { customerId?: string; payment_method?: string; startDate?: Date; endDate?: Date } = {}
    ) {
        try {
            const query: any = {};
            
            if (filters.customerId) {
                query.customerId = filters.customerId;
            }
    
            if (filters.payment_method) {
                query.payment_method = filters.payment_method;
            }
    
            if (filters.startDate || filters.endDate) {
                query.transactionDate = {}; 
                if (filters.startDate) {
                    query.transactionDate.$gte = filters.startDate;  
                }
                if (filters.endDate) {
                    query.transactionDate.$lte = filters.endDate;  
                }
            }
    
            const transactions = await TransactionHistoryModel.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
    
            return transactions;
        } catch (error) {
            console.error("Error fetching transaction history:", error);
            throw new Error("Could not fetch transaction history");
        }
    }
    
}
