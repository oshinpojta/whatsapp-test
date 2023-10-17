import * as express from "express";
import {
  createMaterial, getAllMaterial, updateMaterial,deleteMaterial, materialById
} from "../controllers/materialController";

let router = express.Router();

router.get("/", getAllMaterial);
router.post("/", createMaterial);
router.get("/:id", materialById);
router.put("/:id", updateMaterial);
router.delete("/:id", deleteMaterial);


export = router;
