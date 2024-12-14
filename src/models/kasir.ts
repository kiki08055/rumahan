export interface Product {
    id: number;
    name: string;
    stock: number;
    price: number;
    expire_date?: Date;
    upcoming_product?: Date;
    code_product: string;
  }
  
  export interface Transaction {
    transaction_id?: number;
    customerId: number;
    productId: number;
    quantity: number;
    kasirId: number;
    transactionDate: Date;
    created_at: Date;
    receipts?: Receipt[];
    payment_method: string;
  }
  
  interface Receipt {
    receipt_id: number;
    amount: number;
    date: Date;
    payment_method: string;
  }

  export interface Auth {
    email: string;
    password: string;
    role: string;
    name: string
  }
  
  