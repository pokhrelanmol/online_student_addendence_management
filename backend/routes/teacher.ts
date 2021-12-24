import express from "express";
import { createStudent, getStudents } from "../controllers/teacher";
import { verifyAccessToken } from "../helpers/jwt_helper";
const router = express.Router();

router.route("/getStudents").get(verifyAccessToken, getStudents);
router.route("/createStudent").post(verifyAccessToken, createStudent);
export default router;
