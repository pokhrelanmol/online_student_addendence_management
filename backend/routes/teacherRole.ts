import express from "express";
import {
    getStudents,
    addStudent,
    takeAttendence,
} from "../controllers/teacherRoles";
const router = express.Router();

router.route("/getStudents/:email").get(getStudents);
router.route("/createStudent/:email").post(addStudent);
router.route("/takeAttendence").get(takeAttendence);
export default router;
