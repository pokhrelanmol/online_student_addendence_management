import express from "express";
import {
    regsiterStudent,
    registerTeacher,
} from "../../controllers/auth/register";
const router = express.Router();
router.route("/registerTeacher").post(registerTeacher);
router.route("/registerStudent").get(regsiterStudent).patch(regsiterStudent);
export default router;
