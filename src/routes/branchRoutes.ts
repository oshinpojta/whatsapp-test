// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as express from "express";
import {
  createBranch, getAllBranch, updateBranch,deleteBranch, branchById
} from "../controllers/branchController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllBranch);
router.post("/",authorize("branch","create"), createBranch);
router.get("/:id",branchById);
router.put("/:id",authorize("branch","update"), updateBranch);
router.delete("/:id",authorize("branch","delete"), deleteBranch);


export = router;
