import * as express from "express";
import {
  createItemMaster2, getAllItemMaster2, updateItemMaster2,deleteItemMaster2, ItemMaster2ById,updateBulkItemMaster2
} from "../controllers/Item_Master2Controller";

let router = express.Router();

router.get("/", getAllItemMaster2);
router.post("/", createItemMaster2);
router.get("/:id", ItemMaster2ById);
router.put("/bulk", updateBulkItemMaster2);
router.put("/:id", updateItemMaster2);
router.delete("/:id", deleteItemMaster2);


export = router;
