import * as express from "express";
import {
  createBatch, getAllBatch, batchById, updateBatch, deleteBatch, updateBulkBatch
} from "../controllers/batchController";

let router = express.Router();
//const authorize = require('../middleware/authorize');

router.post("/", createBatch);
router.get("/", getAllBatch);
router.get("/:id", batchById);
router.put("/bulk", updateBulkBatch);
router.put("/:id", updateBatch);
router.delete("/:id", deleteBatch);



export = router;
