import * as express from "express";
import {
  createShift, getAllShift, updateShift,deleteShift, shiftById
} from "../controllers/shiftController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllShift);
router.post("/",authorize("shift", "create"), createShift);
router.get("/:id",shiftById);
router.put("/:id",authorize("shift", "update"), updateShift);
router.delete("/:id",authorize("shift", "delete"), deleteShift);


export = router;
