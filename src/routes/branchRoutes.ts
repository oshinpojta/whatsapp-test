import * as express from "express";
import {
  createBranch, getAllBranch, updateBranch,deleteBranch, branchById
} from "../controllers/branchController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("branch","read"), getAllBranch);
router.post("/",authorize("branch","create"), createBranch);
router.get("/:id",authorize("branch","read"), branchById);
router.put("/:id",authorize("branch","update"), updateBranch);
router.delete("/:id",authorize("branch","delete"), deleteBranch);


export = router;
