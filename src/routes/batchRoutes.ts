import * as express from "express";
import {
  createBatch,getAllBatch,batchById,updateBatch,deleteBatch,updateBulkBatch
} from "../controllers/batchController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.post("/",authorize("batch", "create"), createBatch);
router.get("/",getAllBatch);
router.get("/:id",batchById);
router.put("/bulk",authorize("batch", "create"), updateBulkBatch);
router.put("/:id",authorize("batch", "update"), updateBatch);
router.delete("/:id",authorize("batch", "delete"), deleteBatch);



export = router;
