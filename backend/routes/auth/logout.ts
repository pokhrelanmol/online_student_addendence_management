import express from "express";
import logout from "../../controllers/auth/logout";
const router = express.Router();
router.route("/logout").delete(logout);
export default router;
