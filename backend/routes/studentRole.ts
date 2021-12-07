import express from "express";

import { handlePresent } from "../controllers/studentRoles";
const router = express.Router();
router.route("/students/:id").patch(handlePresent);

export default router;
