import express from "express";
import { teacher } from "../controllers/teacher";
const router = express.Router();

router.route("/teacher").get(teacher);
export default router;
