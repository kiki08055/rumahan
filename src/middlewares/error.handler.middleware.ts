import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export class ErrorHandlerMiddleware {
    errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
        if (err instanceof ZodError) {
            const errors = err.errors.map((error) => ({
                code: "01", 
                field: error.path[0], 
                message: error.message, 
                minimum: error.message.includes("kosong") ? "1" : undefined, 
            }));

            res.status(400).send({
                message: "Validation failed",
                detail: errors,
                status: 400,
            });
            return; // Pastikan Anda menambahkan return setelah mengirim respons
        }

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Prisma error code:", err.code);
            console.error("Error meta:", err.meta);
        
            if (err.code === "P2002") {
                res.status(400).send({
                    message: "Product with the same data already exists.",
                    status: 400,
                    detail: err.meta,
                });
                return; // Pastikan Anda menambahkan return setelah mengirim respons
            }
        
            console.error("Prisma Error:", err.message);
            res.status(500).send({
                message: "Database error occurred",
                status: 500,
                detail: err.message,
            });
            return; // Pastikan Anda menambahkan return setelah mengirim respons
        }
        
        if (err instanceof Error) {
            if (!res.headersSent) { // Periksa apakah respons sudah dikirim
                if (err.message.startsWith("Database error occurred")) {
                    res.status(500).send({
                        message: "Database error occurred",
                        detail: err.message,
                        status: 500,
                    });
                } else {
                    res.status(500).send({
                        message: "Internal Server Error",
                        detail: err.message,
                        status: 500,
                    });
                }
            }
            return; // Pastikan Anda menambahkan return setelah mengirim respons
        }

        next(err); // Hanya lanjutkan jika tidak ada respons yang dikirim
    }
}

