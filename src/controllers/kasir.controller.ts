import { Request, Response } from "express";
import { KasirService } from "../services/kasir.service";
import { Products, transactions } from "../models/kasir";


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
        const { product_id } = req.params;
        const product = await this.kasirService.getProductById(parseInt(product_id));
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

    async createProduct(req: Request, res: Response) {
        const newProduct = await this.kasirService.createProduct(req.body);
        if (newProduct) {
            res.status(201).send({
                message: 'Create product success',
                data: newProduct,
                status: res.statusCode
            });
        } else {
            res.status(400).send({
                message: 'Failed to create product',
                status: res.statusCode
            });
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

    //    async getTransaction(req: Request, res: Response) {
    //     const transaction = await this.kasirService.getTransaction();
    //     if (transaction) {
    //         res.status(200).send({
    //             data: transaction,
    //             status: res.statusCode
    //         });
    //     } else {
    //         res.status(404).send({
    //             message: 'Data not found',
    //             status: res.statusCode
    //         });
    //     }
    //    }
  
    async getAllProducts(req: Request, res: Response) {
        // Panggil service untuk mendapatkan semua produk
        const products = await this.kasirService.getAllProducts();
    
        // Jika ada produk, kembalikan data produk
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
    async createTransaction(req: Request, res: Response) {
        const newTransaction = await this.kasirService.createTransaction(req.body);
        if (newTransaction) {
            res.status(201).send({
                message: 'Create transaction success',
                data: newTransaction,
                status: res.statusCode
            });
        } else {
            res.status(400).send({
                message: 'Failed to create transaction',
                status: res.statusCode
            });
        }
    }

    async getAllTransactions(req: Request, res: Response) {
        // Panggil service untuk mendapatkan semua transaksi
        const transactions = await this.kasirService.getAllTransactions();
        if(transactions) {
            res.status(200).send({
                message: 'Transactions retrieved successfully',
                data: transactions,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'No transactions found',
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
        // Panggil service untuk mendapatkan semua kasir
        const kasirs = await this.kasirService.getAllKasirs();
        if(kasirs) {
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
       async getCustomers(req: Request, res: Response) {
        const customers = await this.kasirService.postCustomers();
        if(customers) {
            res.status(200).send({
                message: 'Customers retrieved successfully',
                data: customers,
                status: res.statusCode
            });
        } else {
            res.status(404).send({
                message: 'No customers found',
            });
        }
       }

}