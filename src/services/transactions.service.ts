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

    async createTransactions(transaction: Omit<Transactions, 'transaction_id'>, payment_method: string) {
        try {
            // Verifikasi apakah produk ada
            const product = await this.prisma.products.findUnique({
                where: { product_id: transaction.productId },
            });
            if (!product) {
                throw new Error(`Product with ID ${transaction.productId} not found.`);
            }
    
            // Verifikasi apakah kasir ada
            const kasir = await this.prisma.kasir.findUnique({
                where: { kasir_id: transaction.kasirId },
            });
            if (!kasir) {
                throw new Error(`Kasir with ID ${transaction.kasirId} not found.`);
            }
    
            // Jika produk dan kasir ada, lanjutkan transaksi
            const newTransaction = await this.prisma.transactions.create({
                data: transaction,
            });
    
            const newReceipt = await this.prisma.receipt.create({
                data: {
                    amount: newTransaction.totalPrice,
                    date: newTransaction.transactionDate || new Date(),
                    payment_method: payment_method || 'cash',
                    transactionId: newTransaction.transaction_id,
                },
            });
    
            return {
                ...newTransaction,
                receipts: [newReceipt],
            };
        } catch (error) {
            console.error("Error while creating transaction:", error);
            throw new Error("Database error occurred while creating transaction.");
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