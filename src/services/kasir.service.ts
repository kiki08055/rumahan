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

    calculateUpcomingProduct(): Date {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 30); // 30 hari dari sekarang
        return currentDate;
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
            const expireDate = this.calculateExpireDate();
            const productCode = this.generateProductCode(product.name);
            const upcomingProduct = this.calculateUpcomingProduct();
            const newProduct = await this.prisma.products.create({
                data: {
                    ...product,
                    expire_date: expireDate, 
                    code_product: productCode,
                    upcoming_product: upcomingProduct,
                },
            });
            return newProduct;
        } catch (error: any) {
            console.error("Error detail:", error); 
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
        const expiredProducts = await this.prisma.products.findMany({
            where: {
                expire_date: {
                    lte: new Date()
                }
            }
        });
        
        console.log('Expired Products:', expiredProducts);
        return expiredProducts;
    }
    
}