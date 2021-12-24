import express from "express";
import refreshToken from "../../controllers/auth/refreshToken";
const router = express.Router();
router.post("/refreshToken", refreshToken);
export default router;
