import { PrismaClient, Transactions } from "@prisma/client";
import { TransactionHistoryModel } from "../models/transactionHistory"; // Import model MongoDB

export class TransactionService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllTransactions() {
        return this.prisma.transactions.findMany();
    }

    async getTransactionsById(transaction_id: number) {
        return this.prisma.transactions.findUnique({
            where: {
                transaction_id
            }
        });
    }

    // Fungsi untuk menyimpan transaksi ke MongoDB
    async saveTransactionToHistory(transactionData: any) {
        console.log("Saving transaction to MongoDB history:", transactionData);
        return TransactionHistoryModel.create(transactionData); 
    }

    //mengambil riwayat transaksi dari MongoDB
    async getTransactionHistory(limit: number, page: number, filters: any) {
        try {
            const skip = (page - 1) * limit;
            const queryFilters: any = {};

            if (filters.customerId) queryFilters.customerId = filters.customerId;
            if (filters.payment_method) queryFilters.payment_method = filters.payment_method;
            if (filters.startDate && filters.endDate) {
                queryFilters.transactionDate = {
                    $gte: filters.startDate,
                    $lte: filters.endDate,
                };
            }

            // Menarik data riwayat transaksi dari MongoDB sesuai dengan filter dan pagination
            const transactions = await TransactionHistoryModel.find(queryFilters)
                .skip(skip)
                .limit(limit)
                .exec();

            return transactions;
        } catch (error) {
            console.error("Error while fetching transaction history:", error);
            throw new Error("Database error occurred while fetching transaction history.");
        }
    }

    // Fungsi untuk membuat transaksi di PostgreSQL dan MongoDB
    async createMultipleTransactions(
        transactions: Omit<Transactions, 'transaction_id'>[], 
        payment_method: string
    ) {
        try {
            const results = await Promise.all(
                transactions.map(async (transaction) => {
                    const product = await this.prisma.products.findUnique({
                        where: { product_id: transaction.productId },
                    });
    
                    if (!product) {
                        throw new Error(`Product with ID ${transaction.productId} not found.`);
                    }
    
                    const kasir = await this.prisma.kasir.findUnique({
                        where: { kasir_id: transaction.kasirId },
                    });
    
                    if (!kasir) {
                        throw new Error(`Kasir with ID ${transaction.kasirId} not found.`);
                    }
    
                    const totalPrice = product.price * transaction.quantity;
    
                    // Membuat transaksi baru di PostgreSQL
                    const newTransaction = await this.prisma.transactions.create({
                        data: {
                            productId: transaction.productId, 
                            quantity: transaction.quantity,
                            kasirId: transaction.kasirId,
                            customerId: transaction.customerId,
                            transactionDate: transaction.transactionDate || new Date(),
                        },
                    });

                    const newReceipt = await this.prisma.receipt.create({
                        data: {
                            amount: totalPrice,
                            date: newTransaction.transactionDate,
                            payment_method: payment_method || 'cash',
                            transactionId: newTransaction.transaction_id,
                        },
                    });

                    // Data yang akan disalin ke MongoDB (Transaction History)
                    const historyData = {
                        transaction_id: newTransaction.transaction_id,
                        customerId: newTransaction.customerId,
                        productId: newTransaction.productId,
                        quantity: newTransaction.quantity,
                        kasirId: newTransaction.kasirId,
                        transactionDate: newTransaction.transactionDate,
                        created_at: newTransaction.created_at,
                        receipts: [{ 
                            receipt_id: newReceipt.receipt_id, 
                            amount: newReceipt.amount, 
                            date: newReceipt.date, 
                            payment_method: newReceipt.payment_method 
                        }],
                        payment_method,
                    };

                    // Simpan transaksi ke MongoDB setelah berhasil disimpan ke PostgreSQL
                    await this.saveTransactionToHistory(historyData);

                    return {
                        ...newTransaction,
                        receipts: [newReceipt],
                    };
                })
            );
    
            return results;
        } catch (error) {
            console.error("Error while creating multiple transactions:", error);
            throw new Error("Database error occurred while creating multiple transactions.");
        }
    }

    async updateTransactions(transaction_id: number, updatedTransaction: any) {
        return this.prisma.transactions.update({
            where: {
                transaction_id
            },
            data: {
                customerId: updatedTransaction.customerId,
                productId: updatedTransaction.productId,
                quantity: updatedTransaction.quantity,
                kasirId: updatedTransaction.kasirId,
              //  transactionDate: updatedTransaction.transactionDate,
            }
        });
    }

    async deleteTransactions(transaction_id: number) {
        return this.prisma.transactions.delete({
            where: { transaction_id }
        });
    }
}
