import { Request, Response, NextFunction } from "express";
import { KasirService } from "../services/kasir.service";
import { productSchema } from "../validators/validateProducts";
import { transactionSchema } from "../validators/validateProducts";
import { error } from "console";
import { number } from "zod";


export class KasirController {
    private kasirService: KasirService;

    constructor() {
        this.kasirService = new KasirService();
    }

    async getProducts(req: Request, res: Response) {
        const product = await this.kasirService.getProducts();
        if (product) {
            res.status(200).send({
                data: product,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'Data not found',
                status: res.statusCode
            });
        }
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        const product = await this.kasirService.getProductById(parseInt(id));
        if (product) {
            res.status(200).send({
                data: product,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'Data not found',
                status: res.statusCode
            });
        }
    }

    async updateProduct(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updateProduct = await this.kasirService.updateProduct(id, req.body);
        if (updateProduct) {
            res.status(201).send({
                message: 'Update product success',
                data: updateProduct,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'Failed to update product',
                status: res.statusCode
            });
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const validatedData = productSchema.safeParse(req.body);

            if (!validatedData.success) {
                const errors = validatedData.error.errors.map((error) => ({
                    code: '',
                    field: error.path[0],
                    message: error.message,
                    minimum: error.message.includes("kosong") ? "1" : undefined,
                }));

                res.status(400).send({
                    message: "Validation failed",
                    detail: errors,
                    status: 400,
                });
            }

            const { name, stock, price, expire_date, upcoming_product, code_product } = validatedData.data!;
            const productDate = expire_date ? new Date(expire_date) : undefined;

            const product = {
                name,
                stock: Number(stock),
                price: Number(price),
                expire_date: productDate,
                upcoming_product,
                code_product: code_product || `AUTO_${Date.now()}`,
            };

            const newProduct = await this.kasirService.createProduct(product);

            res.status(201).send({
                message: "Product successfully created",
                data: newProduct,
                status: 201,
            });

        } catch (error) {
            next(error);
        }
    }

    async deletedProduct(req: Request, res: Response) {
        const id = Number(req.params.id);
        const deleteTransaction = await this.kasirService.deteletdProduct(id);
        if (deleteTransaction) {
            res.status(200).send({
                message: 'Delete transaction success',
                data: deleteTransaction,
                status: res.statusCode
            });
        } else {
            res.status(400).send({
                message: 'Failed to delete transaction',
                status: res.statusCode
            });
        }
    }
    async getAllProducts(req: Request, res: Response) {
        const products = await this.kasirService.getAllProducts();
        if (products.length > 0) {
            res.status(200).send({
                message: "Products retrieved successfully",
                data: products,
            });
        } else {
            res.status(404).send({
                message: "No products found",
            });
        }
    }
    async createKasir(req: Request, res: Response) {
        const newKasir = await this.kasirService.createKasir(req.body);
        if (newKasir) {
            res.status(201).send({
                message: 'Create kasir success',
                data: newKasir,
                status: res.statusCode
            });
        } else {
            res.status(400).send({
                message: 'Failed to create kasir',
                status: res.statusCode
            });
        }
    }
    async getAllKasirs(req: Request, res: Response) {
        const kasirs = await this.kasirService.getAllKasirs();
        if (kasirs) {
            res.status(200).send({
                message: 'Kasirs retrieved successfully',
                data: kasirs,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'No kasirs found',
            });
        }
    }
    async getExpiredProducts(req: Request, res: Response) {
        const expiredProducts = await this.kasirService.getExpiredProducts();
        if (expiredProducts) {
            res.status(200).send({
                message: 'Expired products retrieved successfully',
                data: expiredProducts,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'No expired products found',
            });
        }
    }

}