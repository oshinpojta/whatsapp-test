import * as express from "express";
import {
  createNodeCategory, getAllNodeCategory, updateNodeCategory,deleteNodeCategory, nodeCategoryById
} from "../controllers/nodeCategoryController";

let router = express.Router();

router.get("/", getAllNodeCategory);
router.post("/", createNodeCategory);
router.get("/:id", nodeCategoryById);
router.put("/:id", updateNodeCategory);
router.delete("/:id", deleteNodeCategory);


export = router;
