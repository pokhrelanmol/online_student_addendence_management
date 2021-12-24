import express from "express";
import { login } from "../../controllers/auth/login";
import { signRefreshToken } from "../../helpers/jwt_helper";
const router = express.Router();
router.route("/login").post(login);
export default router;
