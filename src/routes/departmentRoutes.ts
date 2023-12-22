import * as express from "express";
import {
  createDepartment, getAllDepartment, updateDepartment,deleteDepartment, departmentById
} from "../controllers/departmentController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllDepartment);
router.post("/",authorize("department","create"), createDepartment);
router.get("/:id",departmentById);
router.put("/:id",authorize("department","update"), updateDepartment);
router.delete("/:id",authorize("department","delete"), deleteDepartment);


export = router;
