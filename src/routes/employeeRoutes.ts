import * as express from "express";
import {
  createEmployee, getAllEmployee, updateEmployee,deleteEmployee, employeeById
} from "../controllers/employeeController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("employee","read"), getAllEmployee);
router.post("/",authorize("employee","create"), createEmployee);
router.get("/:id",authorize("employee","read"), employeeById);
router.put("/:id",authorize("employee","update"), updateEmployee);
router.delete("/:id",authorize("employee","delete"), deleteEmployee);


export = router;
