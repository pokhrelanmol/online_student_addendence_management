import express from "express";
import { createStudent, getStudents } from "../controllers/teacher";
import { verifyAccessTokenForTeacher } from "../helpers/jwt_helper";
const router = express.Router();

router.route("/getStudents").get(verifyAccessTokenForTeacher, getStudents);
router.route("/createStudent").post(verifyAccessTokenForTeacher, createStudent);
export default router;
