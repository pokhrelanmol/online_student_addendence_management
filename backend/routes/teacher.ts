import express from "express";
import { getStudents, addStudent, handlePresent } from "../controllers/teacher";
const router = express.Router();

router.route("/students").get(getStudents).post(addStudent);
router.route("/students/:id").patch(handlePresent);
export default router;
