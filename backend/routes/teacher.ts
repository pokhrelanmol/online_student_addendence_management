import express from "express";
import { createStudent, getStudents } from "../controllers/teacher";
const router = express.Router();

import { authenticateToken } from "../middlewares/authenticateToken";
router.route("/getStudents").get(authenticateToken, getStudents);
router.route("/createStudent/:email").post(createStudent);
export default router;
