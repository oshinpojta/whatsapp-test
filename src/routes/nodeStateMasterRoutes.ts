import * as express from "express";
import {
  createNodeStateMaster, getAllNodeStateMaster, updateNodeStateMaster,deleteNodeStateMaster, nodeStateMasterById
} from "../controllers/NodeStateMasterController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("node_state_master", "read"), getAllNodeStateMaster);
router.post("/",authorize("node_state_master", "create"), createNodeStateMaster);
router.get("/:id",authorize("node_state_master", "read"), nodeStateMasterById);
router.put("/:id",authorize("node_state_master", "update"), updateNodeStateMaster);
router.delete("/:id",authorize("node_state_master", "delete"), deleteNodeStateMaster);


export = router;
