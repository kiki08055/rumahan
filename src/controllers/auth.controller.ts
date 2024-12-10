import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { Auth } from "../models/kasir";

export class Authcontroller {
    private authService: AuthService;

    constructor(){
        this.authService = new AuthService()
    }

    async register(req: Request, res: Response) {
        const kasir: Auth = req.body;
    
        try {
            const data = await this.authService.register(kasir);
            res.status(201).send({
                message: 'Register success',
                data: data,
                status: res.statusCode,
            });
    
        } catch (error: any) {
            if (error.message === 'Email sudah terdaftar') {
                res.status(400).send({
                    message: 'Email sudah terdaftar',
                    status: res.statusCode,
                });
            } else {
                res.status(500).send({
                    message: 'Failed to register',
                    status: res.statusCode,
                });
            }
        }
    }
    
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken, kasir} = await this.authService.login(
                email,
                password
            );
            const data = { accessToken, refreshToken, kasir}
            res.status(200).send({
                data: {
                    kasir: data.kasir,
                    access_token: data.accessToken,
                    refresh_token: data.refreshToken
                },
                message: "successfully logged in",
                status: res.statusCode
            });
        } catch (error: any) {
            res.status(401).send({
                message: `failed to login`,
                status: res.statusCode
            });
            
        }
    }
    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        const data = await this.authService.refreshToken(refreshToken)
        if(data) {
            res.status(200).send({
                data: {
                    access_token: data,
                },
                message: "Successfully refreshed token",
                status: res.statusCode
            });
        } else {
            res.status(401).send({
                message: `failed to refresh token`,
                status: res.statusCode
            });
        }
    }
}