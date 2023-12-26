import * as express from "express";
import {
  createItemMaster, getAllItemMaster, updateItemMaster,deleteItemMaster, ItemMasterById,updateBulkItemMaster
} from "../controllers/itemMasterController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",getAllItemMaster);
router.post("/",authorize("item_master","create"), createItemMaster);
router.get("/:id",ItemMasterById);
router.put("/bulk",authorize("item_master","create"), updateBulkItemMaster);
router.put("/:id",authorize("item_master","update"), updateItemMaster);
router.delete("/:id",authorize("item_master","delete"), deleteItemMaster);


export = router;
