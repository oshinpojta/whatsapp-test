import * as express from "express";
import {
  createBatch,getAllBatch,batchById,updateBatch,deleteBatch,updateBulkBatch,//createBatchData,updateBatchData
} from "../controllers/batchController";

let router = express.Router();

router.post("/", createBatch);
router.get("/", getAllBatch);
router.get("/:id", batchById);
router.put("/:id", updateBatch);
router.put("/:bulk", updateBulkBatch);
router.delete("/:id", deleteBatch);



export = router;
