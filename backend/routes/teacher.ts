import express from "express";
import { getStudents, teacherDashboard } from "../controllers/teacher";
const router = express.Router();

router.route("/teacherDashboard").get(teacherDashboard);
router.route("/teacherDashboard/students").get(getStudents);
export default router;
