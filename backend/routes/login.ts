import express from "express";
import { loginTeacher, loginStudent } from "../controllers/login";
const router = express.Router();
router.route("/loginTeacher").post(loginTeacher);
router.route("/loginStudent").post(loginStudent);
export default router;
