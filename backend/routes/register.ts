import express from "express";
import { regsiterStudent, registerTeacher } from "../controllers/register";
const router = express.Router();
router.route("/registerTeacher").post(registerTeacher);
router.route("/registerStudent").patch(regsiterStudent);
export default router;
