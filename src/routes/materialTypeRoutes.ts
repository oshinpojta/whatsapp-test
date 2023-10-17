import * as express from "express";
import {
  createMaterialType, getAllMaterialType, updateMaterialType,deleteMaterialType, materialTypeById
} from "../controllers/materialTypeController";

let router = express.Router();

router.get("/", getAllMaterialType);
router.post("/", createMaterialType);
router.get("/:id", materialTypeById);
router.put("/:id", updateMaterialType);
router.delete("/:id", deleteMaterialType);


export = router;
