import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Auth } from "../models/kasir"
import { PrismaClient } from "@prisma/client";
import { authSchema } from "../validators/auth.validator";
import { access } from "fs";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async register(data: Auth) {
        const validatedData = authSchema.parse(data);
        const existingKasir = await this.prisma.kasir.findUnique({
            where: { email: validatedData.email },
        });
    
        if (existingKasir) {
            throw new Error('Email sudah terdaftar');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.kasir.create({
            data: {
                email: validatedData.email,
                password: hashedPassword,
                name: data.name,
                role: data.role,
            },
        });
    }
    
    async login(email: string, password: string) {
        const data = { email, password };
        const validatedData = authSchema.parse(data);
        const kasir = await this.prisma.kasir.findUnique({
            where: {
                email: validatedData.email,
            },
        });
        if (!kasir || !(await bcrypt.compare(password, kasir.password))) {
            throw new Error("Email atau password salah");
        }

        const accessToken = jwt.sign(
            { id: kasir.kasir_id, role: kasir.role },
            JWT_SECRET,
            {
                expiresIn: "7d", 
            }
        );

        const refreshToken = jwt.sign(
            { id: kasir.kasir_id, role: kasir.role },
            JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        await this.prisma.kasir.update({
            where: {
                email: email,
            },
            data: {
                refresh_token: refreshToken,
            },
        });

        return { accessToken, refreshToken, kasir };
    }
    async refreshToken(token: string){
        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);
            const kasir = await this.prisma.kasir.findUnique({
                where: {
                    kasir_id: decoded.id,
                },
            });
            if(!kasir) {
                throw new Error("Token expired or invalid");
            }

            const accessToken = jwt.sign(
                { id: kasir.kasir_id, role: kasir.role },
                JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            return accessToken;
        } catch (error) {
            throw new Error("Token expired or invalid");
            
        }
    }
}

