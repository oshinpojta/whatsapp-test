import * as express from "express";
import {
  createOA_DETMaster, getAllQA_DET, updateOA_DETMaster,deleteOA_DETMaster, OA_DETMasterById,updateBulkOA_DETMaster
} from "../controllers/QA_DETControllers";

let router = express.Router();

router.get("/", getAllQA_DET);
router.post("/", createOA_DETMaster);
router.get("/:id", OA_DETMasterById);
router.put("/bulk", updateBulkOA_DETMaster);
router.put("/:id", updateOA_DETMaster);
router.delete("/:id", deleteOA_DETMaster);


export = router;
