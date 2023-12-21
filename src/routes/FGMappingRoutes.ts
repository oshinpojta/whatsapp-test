import * as express from "express";
import {
  createFGMapping, getAllFGMapping, updateFGMapping,deleteFGMapping, FGMappingById,updateBulkFGMapping
} from "../controllers/FGController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("fg_mapping","read"), getAllFGMapping);
router.post("/",authorize("fg_mapping","create"), createFGMapping);
router.get("/:id",authorize("fg_mapping","read"), FGMappingById);
router.put("/bulk",authorize("fg_mapping","update"), updateBulkFGMapping);
router.put("/:id",authorize("fg_mapping","update"), updateFGMapping);
router.delete("/:id",authorize("fg_mapping","delete"), deleteFGMapping);


export = router;
