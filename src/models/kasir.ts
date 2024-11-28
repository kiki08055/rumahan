export interface Products{
    id: number;
    name: string;
    stock: number;
    price: number;
}

export interface transactions {
    transaction_id: number; 
    customer_id: number;
    productId: number;
    quantity: number;
    totalPrice: number; 
    kasirId: number; 
    transactionDate: Date; 
  }
  