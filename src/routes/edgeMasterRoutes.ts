import * as express from "express";
import {
  createEdgeMaster, getAllEdgeMaster, updateEdgeMaster,deleteEdgeMaster, edgeMasterById, createBulkEdgeMaster, updateBulkEdgeMaster
} from "../controllers/EdgeMasterController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("edge_master","read"), getAllEdgeMaster);
router.post("/",authorize("edge_master","create"), createEdgeMaster);
router.post("/bulk",authorize("edge_master","create"), createBulkEdgeMaster);
router.put("/bulk",authorize("edge_master","update"), updateBulkEdgeMaster);
router.get("/:id",authorize("edge_master","read"), edgeMasterById);
router.put("/:id",authorize("edge_master","update"), updateEdgeMaster);
router.delete("/:id",authorize("edge_master","delete"), deleteEdgeMaster);


export = router;
