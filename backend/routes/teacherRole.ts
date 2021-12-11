import express from "express";
import {
    getStudents,
    addStudent,
    takeAttendence,
    finishAttendence,
} from "../controllers/teacherRoles";
const router = express.Router();

router.route("/getStudents/:email").get(getStudents);
router.route("/createStudent/:email").post(addStudent);
router.route("/takeAttendence").patch(takeAttendence);
router.route("/finishAttendence").patch(finishAttendence);
export default router;
