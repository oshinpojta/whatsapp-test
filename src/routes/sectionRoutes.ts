import * as express from "express";
import {
  createSection, getAllSection, updateSection,deleteSection, sectionById
} from "../controllers/sectionController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("section", "read"), getAllSection);
router.post("/",authorize("section", "create"), createSection);
router.get("/:id",authorize("section", "read"), sectionById);
router.put("/:id",authorize("section", "update"), updateSection);
router.delete("/:id",authorize("section", "delete"), deleteSection);


export = router;
