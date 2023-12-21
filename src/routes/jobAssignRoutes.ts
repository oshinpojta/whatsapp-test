import * as express from "express";
import {
  createJobAssign, getAllJobAssign, updateJobAssign,deleteJobAssign, jobAssignById,updateBulkJobAssign
} from "../controllers/jobAssignController";
let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("job_assign", "read"), getAllJobAssign);
router.post("/",authorize("job_assign", "create"), createJobAssign);
router.get("/:id",authorize("job_assign", "read"), jobAssignById);
router.put("/bulk",authorize("job_assign", "update"), updateBulkJobAssign);
router.put("/:id",authorize("job_assign", "update"), updateJobAssign);
router.delete("/:id",authorize("job_assign", "delete"), deleteJobAssign);


export = router;
