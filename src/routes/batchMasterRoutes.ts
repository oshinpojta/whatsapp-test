import * as express from "express";
import {
    createBatchMaster, getAllBatchMaster, updateBatchMaster, deleteBatchMaster,
} from "../controllers/batchMasterController";

let router = express.Router();

router.post("/", createBatchMaster);
router.get("/", getAllBatchMaster);
router.put("/:id", updateBatchMaster);
router.delete("/:id", deleteBatchMaster);


export = router;
