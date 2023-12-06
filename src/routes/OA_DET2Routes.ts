import * as express from "express";
import {
  createOA_DETMaster2, getAllQA_DET2, updateOA_DETMaster2,deleteOA_DETMaster2, OA_DETMaster2ById,updateBulkOA_DETMaster2
} from "../controllers/OA_DET2Controller"

let router = express.Router();

router.get("/", getAllQA_DET2);
router.post("/", createOA_DETMaster2);
router.get("/:id", OA_DETMaster2ById);
router.put("/bulk", updateBulkOA_DETMaster2);
router.put("/:id", updateOA_DETMaster2);
router.delete("/:id", deleteOA_DETMaster2);


export = router;
