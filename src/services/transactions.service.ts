import { PrismaClient, Transactions } from "@prisma/client";

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
    
                    const newTransaction = await this.prisma.transactions.create({
                        data: {
                            ...transaction,
                        },
                    });
    
                    const newReceipt = await this.prisma.receipt.create({
                        data: {
                            amount: totalPrice,
                            date: newTransaction.transactionDate || new Date(),
                            payment_method: payment_method || 'cash',
                            transactionId: newTransaction.transaction_id,
                        },
                    });
    
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
            data: updatedTransaction,
        })
    }
}