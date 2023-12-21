import * as express from "express";
import {
  createOA_DETMaster, getAllQA_DET, updateOA_DETMaster,deleteOA_DETMaster, OA_DETMasterById,updateBulkOA_DETMaster
} from "../controllers/QA_DETControllers";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("oa_det_master", "read"), getAllQA_DET);
router.post("/",authorize("oa_det_master", "create"), createOA_DETMaster);
router.get("/:id",authorize("oa_det_master", "read"), OA_DETMasterById);
router.put("/bulk",authorize("oa_det_master", "update"), updateBulkOA_DETMaster);
router.put("/:id",authorize("oa_det_master", "update"), updateOA_DETMaster);
router.delete("/:id",authorize("oa_det_master", "delete"), deleteOA_DETMaster);


export = router;
