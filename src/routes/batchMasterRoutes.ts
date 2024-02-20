import * as express from "express";
import {
    createBatchMaster, getAllBatchMaster, updateBatchMaster, deleteBatchMaster, updateBulkBatchMaster,
} from "../controllers/batchMasterController";

//const authorize = require('../middleware/authorize');
let router = express.Router();

router.post("/", createBatchMaster);
router.get("/", getAllBatchMaster);
router.put("/bulk", updateBulkBatchMaster);
router.put("/:id", updateBatchMaster);
router.delete("/:id", deleteBatchMaster);


export = router;
