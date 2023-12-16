import * as express from "express";
import {
  getAllMenu, updateMenu,deleteMenu, menuById,getAllTableMaster
} from "../controllers/MenuController";

let router = express.Router();

router.get("/", getAllMenu);
router.get("/tables", getAllTableMaster);
router.get("/:id", menuById);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);


export = router;
