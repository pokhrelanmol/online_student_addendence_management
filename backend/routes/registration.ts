import express from "express";
import { registerTeacher, regsiterStudent } from "../controllers/registration";
const router = express.Router();
router.route("/registerTeacher").post(registerTeacher);
router.route("/regsiterStudent").post(regsiterStudent);
export default router;
