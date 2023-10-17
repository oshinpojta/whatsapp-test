import * as express from "express";
import {
  createBranch, getAllBranch, updateBranch,deleteBranch, branchById
} from "../controllers/branchController";

let router = express.Router();

router.get("/", getAllBranch);
router.post("/", createBranch);
router.get("/:id", branchById);
router.put("/:id", updateBranch);
router.delete("/:id", deleteBranch);


export = router;
