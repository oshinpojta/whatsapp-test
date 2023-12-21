import * as express from "express";
import {
    createBatchMaster, getAllBatchMaster, updateBatchMaster, deleteBatchMaster,
} from "../controllers/batchMasterController";

const authorize = require('../middleware/authorize');
let router = express.Router();

router.post("/", authorize("batch_master", "create"), createBatchMaster);
router.get("/", authorize("batch_master", "read"), getAllBatchMaster);
router.put("/:id", authorize("batch_master", "update"), updateBatchMaster);
router.delete("/:id", authorize("batch_master", "delete"), deleteBatchMaster);


export = router;
