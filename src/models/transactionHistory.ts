import mongoose, { Schema, Document } from "mongoose";

interface Receipt {
    receipt_id: number;
    amount: number;
    date: Date;
    payment_method: string;
}

export interface ITransactionHistory extends Document {
    transaction_id: number;
    customerId: number;
    productId: number;
    quantity: number;
    kasirId: number;
    transactionDate: Date;
    created_at: Date;
    receipts?: Receipt[];
    payment_method?: string;
}

const transactionHistorySchema = new Schema<ITransactionHistory>({
    transaction_id: { type: Number },
    customerId: { type: Number, required: true },
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true },
    kasirId: { type: Number, required: true },
    transactionDate: { type: Date, required: true },
    created_at: { type: Date, required: true },
    receipts: [{
        receipt_id: { type: Number },
        amount: { type: Number },
        date: { type: Date },
        payment_method: { type: String }
    },
    ],
    payment_method: { type: String, required: true }
});
export const TransactionHistoryModel = mongoose.model<ITransactionHistory>(
    "TransactionHistory",
    transactionHistorySchema,
)