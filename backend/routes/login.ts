import express from "express";
import { login, generateNewToken } from "../controllers/login";
const router = express.Router();
router.route("/login").post(login);
router.route("/token").post(generateNewToken);
export default router;
