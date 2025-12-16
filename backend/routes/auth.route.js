import { Router } from "express";
import { signUp, login, logOut } from '../controllers/auth.controller.js'
const router = Router();

router.get("/signup", signUp)

router.get("/login", login)

router.get("/logout", logOut)

export default router