import * as express from "express";
import {
  createNodeAllocation, getAllNodeAllocation, updateNodeAllocation,deleteNodeAllocation, NodeAllocationById,updateBulkNodeAllocation
} from "../controllers/nodeAllocationController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllNodeAllocation);
router.post("/",authorize("node_allocation", "create"),  createNodeAllocation);
router.get("/:id", NodeAllocationById);
router.put("/bulk",authorize("node_allocation", "create"),  updateBulkNodeAllocation);
router.put("/:id",authorize("node_allocation", "update"),  updateNodeAllocation);
router.delete("/:id",authorize("node_allocation", "delete"),  deleteNodeAllocation);


export = router;
