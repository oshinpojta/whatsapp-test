import * as express from "express";
import {
  createAttendance, getAllAttendance, updateAttendance,deleteAttendance, AttendanceById,updateBulkAttendance
} from "../controllers/attendanceController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllAttendance);
router.post("/", authorize("attendance","create"), createAttendance);
router.get("/:id",AttendanceById);
router.put("/bulk", authorize("attendance","update"), updateBulkAttendance);
router.put("/:id", authorize("attendance","update"), updateAttendance);
router.delete("/:id", authorize("attendance","delete"), deleteAttendance);


export = router;
