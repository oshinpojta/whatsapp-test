import * as express from "express";
import {
  createEmployeeNodeMapping, getAllEmployeeNodeMapping,updateBulkEmployeeNodeMapping, updateEmployeeNodeMapping,deleteEmployeeNodeMapping, EmployeeNodeMappingById
} from "../controllers/employeeNodeMappingController";

let router = express.Router();

router.get("/", getAllEmployeeNodeMapping);
router.post("/", createEmployeeNodeMapping);
router.get("/:id", EmployeeNodeMappingById);
router.put("/bulk", updateBulkEmployeeNodeMapping);
router.put("/:id", updateEmployeeNodeMapping);
router.delete("/:id", deleteEmployeeNodeMapping);


export = router;
