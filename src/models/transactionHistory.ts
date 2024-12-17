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
    customerId: {
        type: Number,
        required: true,
        validate: {
            validator: function(v: number) {
                return v >= 0; // Pastikan customerId tidak negatif
            },
            message: props => `${props.value} tidak boleh negatif untuk customerId`
        }
    },
    productId: { type: Number, required: true },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: function(v: number) {
                return v >= 0; // Pastikan quantity tidak negatif
            },
            message: props => `${props.value} tidak boleh negatif untuk quantity`
        }
    },
    kasirId: { type: Number, required: true },
    transactionDate: { type: Date, required: true },
    created_at: { type: Date, required: true },
    receipts: [{
        receipt_id: { type: Number },
        amount: {
            type: Number,
            required: true,
            validate: {
                validator: function(v: number) {
                    return v >= 0; // Pastikan amount tidak negatif
                },
                message: props => `${props.value} tidak boleh negatif untuk amount pada receipt`
            }
        },
        date: { type: Date, required: true },
        payment_method: { type: String, required: true }
    }],
    payment_method: { type: String, required: true }
});

export const TransactionHistoryModel = mongoose.model<ITransactionHistory>(
    "TransactionHistory",
    transactionHistorySchema
);
