import * as express from "express";
import {
  createJobAssign, getAllJobAssign, updateJobAssign,deleteJobAssign, jobAssignById,updateBulkJobAssign
} from "../controllers/jobAssignController";
const authorize = require('../middleware/authorize');
let router = express.Router();

router.get("/",getAllJobAssign);
router.post("/",authorize("job_assign", "create"), createJobAssign);
router.get("/:id",jobAssignById);
router.put("/bulk",authorize("job_assign", "update"), updateBulkJobAssign);
router.put("/:id",authorize("job_assign", "update"), updateJobAssign);
router.delete("/:id",authorize("job_assign", "delete"), deleteJobAssign);


export = router;
