import * as express from "express";
import {
  createMaterialCategory, getAllMaterialCategory, updateMaterialCategory,deleteMaterialCategory, materialCategoryById
} from "../controllers/materialCategoryController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllMaterialCategory);
router.post("/",authorize("material_category","create"), createMaterialCategory);
router.get("/:id",materialCategoryById);
router.put("/:id",authorize("material_category","update"), updateMaterialCategory);
router.delete("/:id",authorize("material_category","delete"), deleteMaterialCategory);


export = router;
