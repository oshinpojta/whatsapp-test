import * as express from "express";
import {
  createNodeType, getAllNodeTypes, updateNodeTypes,deleteNodeType, NodeTypeById,updateBulkNodeType
} from "../controllers/nodeTypeController";

let router = express.Router();

router.get("/", getAllNodeTypes);
router.post("/", createNodeType);
router.get("/:id", NodeTypeById);
router.put("/bulk", updateBulkNodeType);
router.put("/:id", updateNodeTypes);
router.delete("/:id", deleteNodeType);


export = router;
