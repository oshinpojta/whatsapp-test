import * as express from "express";
import {
  createUnitMaster, getAllUnitMaster, updateUnitMaster,deleteUnitMaster, unitMasterById
} from "../controllers/unitMasterController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllUnitMaster);
router.post("/",authorize("unit_master", "create"), createUnitMaster);
router.get("/:id",unitMasterById);
router.put("/:id",authorize("unit_master", "update"), updateUnitMaster);
router.delete("/:id",authorize("unit_master", "delete"), deleteUnitMaster);


export = router;
