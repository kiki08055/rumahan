import { PrismaClient } from "@prisma/client";
import { Product } from "../models/kasir";

export class KasirService {
    private prisma: PrismaClient;

    calculateExpireDate(): Date {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() + 2);
        return currentDate;
    }
    generateProductCode(name: string): string {
        const timestamp = Date.now();
        const productCode = `${name.substring(0, 3).toUpperCase()}${timestamp}`;
        return productCode;
    }

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getProducts() {
        return this.prisma.products.findMany();
    }

    async getProductById(product_id: number) {
        console.log(product_id);

        return this.prisma.products.findUnique({
            where: {
                product_id
            }
        });
    }

    async updateProduct(product_id: number, data: Product) {
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

    async createProduct(product: any) {
        try {
            const newProduct = await this.prisma.products.create({
                data: product,
            });
            return newProduct;
        } catch (error) {
            throw new Error("Database error occurred while creating product.");
        }
    }

    async getAllProducts() {
        return this.prisma.products.findMany();
    }

    async createKasir(data: { name: string, email: string}) {
        return this.prisma.kasir.create({
            data: {
                name: data.name,
                email: data.email,
            },
        });
    }
    async getAllKasirs() {
        return this.prisma.kasir.findMany();
    }
    async getExpiredProducts() {
        return this.prisma.products.findMany({
            where: {
                expire_date: {
                    lte: new Date()
                }
            }
        });
    }

}