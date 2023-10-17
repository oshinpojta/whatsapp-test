import * as express from "express";
import {
  createAttendance, getAllAttendance, updateAttendance,deleteAttendance, AttendanceById,updateBulkAttendance
} from "../controllers/attendanceController";

let router = express.Router();

router.get("/", getAllAttendance);
router.post("/", createAttendance);
router.get("/:id", AttendanceById);
router.put("/bulk", updateBulkAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);


export = router;
