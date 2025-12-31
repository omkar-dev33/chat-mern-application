import { Router } from "express";
import { signUp, login, logOut, updateProfile, checkAuth } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
const router = Router();

router.post("/signup", signUp)

router.post("/login", login)

router.post("/logout", logOut)


router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router



