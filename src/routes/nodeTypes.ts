import * as express from "express";
import {
  createNodeType, getAllNodeTypes, updateNodeTypes,deleteNodeType, NodeTypeById,updateBulkNodeType
} from "../controllers/nodeTypeController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("node_types", "read"), getAllNodeTypes);
router.post("/",authorize("node_types", "create"), createNodeType);
router.get("/:id",authorize("node_types", "read"), NodeTypeById);
router.put("/bulk",authorize("node_types", "update"), updateBulkNodeType);
router.put("/:id",authorize("node_types", "update"), updateNodeTypes);
router.delete("/:id",authorize("node_types", "delete"), deleteNodeType);


export = router;
