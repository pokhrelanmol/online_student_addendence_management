import express from "express";
import { registerTeacher, regsiterStudent } from "../controllers/registration";
const router = express.Router();
router.route("/registerTeacher").post(registerTeacher);
router.route("/registerStudent").post(regsiterStudent);
export default router;
