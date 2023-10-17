import * as express from "express";
import {
  createNodeStateMaster, getAllNodeStateMaster, updateNodeStateMaster,deleteNodeStateMaster, nodeStateMasterById
} from "../controllers/NodeStateMasterController";

let router = express.Router();

router.get("/", getAllNodeStateMaster);
router.post("/", createNodeStateMaster);
router.get("/:id", nodeStateMasterById);
router.put("/:id", updateNodeStateMaster);
router.delete("/:id", deleteNodeStateMaster);


export = router;
