import express from "express";
import { loginAuth } from "../controllers/loginController.js";

const router = express.Router();
router.post("/login", loginAuth);

export default router;
