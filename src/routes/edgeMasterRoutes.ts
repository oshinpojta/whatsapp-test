import * as express from "express";
import {
  createEdgeMaster, getAllEdgeMaster, updateEdgeMaster,deleteEdgeMaster, edgeMasterById, createBulkEdgeMaster, updateBulkEdgeMaster
} from "../controllers/EdgeMasterController";

let router = express.Router();

router.get("/", getAllEdgeMaster);
router.post("/", createEdgeMaster);
router.post("/bulk", createBulkEdgeMaster);
router.put("/bulk", updateBulkEdgeMaster);
router.get("/:id", edgeMasterById);
router.put("/:id", updateEdgeMaster);
router.delete("/:id", deleteEdgeMaster);


export = router;
