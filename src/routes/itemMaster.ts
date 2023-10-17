import * as express from "express";
import {
  createItemMaster, getAllItemMaster, updateItemMaster,deleteItemMaster, ItemMasterById,updateBulkItemMaster
} from "../controllers/itemMasterController";

let router = express.Router();

router.get("/", getAllItemMaster);
router.post("/", createItemMaster);
router.get("/:id", ItemMasterById);
router.put("/bulk", updateBulkItemMaster);
router.put("/:id", updateItemMaster);
router.delete("/:id", deleteItemMaster);


export = router;
