import * as express from "express";
import {
  createMaterialType, getAllMaterialType, updateMaterialType,deleteMaterialType, materialTypeById
} from "../controllers/materialTypeController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("material_type", "read"), getAllMaterialType);
router.post("/",authorize("material_type", "create"), createMaterialType);
router.get("/:id",authorize("material_type", "read"), materialTypeById);
router.put("/:id",authorize("material_type", "update"), updateMaterialType);
router.delete("/:id",authorize("material_type", "delete"), deleteMaterialType);


export = router;
