import * as express from "express";
import {
  createShift, getAllShift, updateShift,deleteShift, shiftById
} from "../controllers/shiftController";

let router = express.Router();

router.get("/", getAllShift);
router.post("/", createShift);
router.get("/:id", shiftById);
router.put("/:id", updateShift);
router.delete("/:id", deleteShift);


export = router;
