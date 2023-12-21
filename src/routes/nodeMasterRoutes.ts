import * as express from "express";
import {
  createNodeMaster, getAllNodeMaster, updateNodeMaster,deleteNodeMaster, nodeMasterById, createBulkNodeMaster, updateBulkNodeMaster
} from "../controllers/nodeMasterController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("node_master", "read"), getAllNodeMaster);
router.post("/",authorize("node_master", "create"), createNodeMaster);
router.post("/bulk",authorize("node_master", "create"), createBulkNodeMaster);
router.put("/bulk",authorize("node_master", "update"), updateBulkNodeMaster);
router.get("/:id",authorize("node_master", "read"), nodeMasterById);
router.put("/:id",authorize("node_master", "update"), updateNodeMaster);
router.delete("/:id",authorize("node_master", "delete"), deleteNodeMaster);


export = router;
