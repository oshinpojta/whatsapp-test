import * as express from "express";
import {
  getAllMenu, updateMenu,deleteMenu, menuById,getAllTableMaster
} from "../controllers/MenuController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("menus", "read"), getAllMenu);
router.get("/tables", getAllTableMaster);
router.get("/:id",authorize("menus", "read"), menuById);
router.put("/:id",authorize("menus", "update"), updateMenu);
router.delete("/:id",authorize("menus", "delete"), deleteMenu);


export = router;
