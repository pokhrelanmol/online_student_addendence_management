import express from "express";
import { getStudents, addStudent} from "../controllers/teacherRoles";
const router = express.Router();

router.route("/students").get(getStudents).post(addStudent);
export default router;
