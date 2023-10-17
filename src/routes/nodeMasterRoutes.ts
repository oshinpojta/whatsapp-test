import * as express from "express";
import {
  createNodeMaster, getAllNodeMaster, updateNodeMaster,deleteNodeMaster, nodeMasterById, createBulkNodeMaster, updateBulkNodeMaster
} from "../controllers/nodeMasterController";

let router = express.Router();

router.get("/", getAllNodeMaster);
router.post("/", createNodeMaster);
router.post("/bulk", createBulkNodeMaster);
router.put("/bulk", updateBulkNodeMaster);
router.get("/:id", nodeMasterById);
router.put("/:id", updateNodeMaster);
router.delete("/:id", deleteNodeMaster);


export = router;
