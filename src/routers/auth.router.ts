import { Router } from "express";
import { Authcontroller } from "../controllers/auth.controller";

const router = Router();
const authController = new Authcontroller();

router.post('/login', authController.login.bind(authController))
router.post('/register', authController.register.bind(authController))
router.post('/refresh-token', authController.refreshToken.bind(authController))
export default router;