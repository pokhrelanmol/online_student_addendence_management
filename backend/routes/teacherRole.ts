import express from "express";
import { getStudents, addStudent } from "../controllers/teacherRoles";
const router = express.Router();

router.route("/getStudents").get(getStudents);
router.route("/createStudent/:email").post(addStudent);
export default router;
