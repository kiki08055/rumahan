import { PrismaClient } from "@prisma/client";
import { Products, transactions } from "../models/kasir";

export class KasirService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getProducts() {
        return this.prisma.products.findMany();
    }

    async getProductById(product_id: number) {
        return this.prisma.products.findUnique({
            where: {
                product_id
            }
        });
    }

    async updateProduct(product_id: number, data: Products) {
        return this.prisma.products.update({
            where: { product_id },
            data: {
                name: data.name,
                stock: data.stock,
                price: data.price
            }
        });
    }

    async deteletdProduct(product_id: number) {
        return this.prisma.products.delete({
            where: { product_id }
        });
    }

    async createProduct(data: { name: string; stock: number; price: number }) {
        return this.prisma.products.create({
            data,
        });
    }

    async getAllProducts() {
        return this.prisma.products.findMany();
    }
    async createTransaction(data: {
        productId: number;
        quantity: number;
        totalPrice: number;
        kasirId: number;
        customerId: number;
    }) {
        if (!data.customerId) {
            throw new Error("customerId is required");
        }

        return this.prisma.transactions.create({
            data: {
                productId: data.productId,
                quantity: data.quantity,
                totalPrice: data.totalPrice,
                created_at: new Date(),
                kasirId: data.kasirId,
                customerId: data.customerId,
            }
        });
    }

    async getAllTransactions() {
        return this.prisma.transactions.findMany();
    }
    async createKasir(data: { name: string }) {
        return this.prisma.kasir.create({
            data: {
                name: data.name,
            },
        });
    }
    async getAllKasirs() {
        return this.prisma.kasir.findMany();
    }
    async createCustomers(customer_id: number, name: string) {
        return this.prisma.customer.create({
            data: {
                customer_id,
                name,
            },
        });
    }
    
}