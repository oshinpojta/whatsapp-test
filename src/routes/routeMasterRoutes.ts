import * as express from "express";
import {
  createRouteMaster, getAllRouteMaster, updateRouteMaster,deleteRouteMaster, routeMasterById
} from "../controllers/RouteMasterController";

let router = express.Router();
const authorize = require('../middleware/authorize');

router.get("/",authorize("route_master", "read"), getAllRouteMaster);
router.post("/",authorize("route_master", "create"), createRouteMaster);
router.get("/:id",authorize("route_master", "read"), routeMasterById);
router.put("/:id",authorize("route_master", "update"), updateRouteMaster);
router.delete("/:id",authorize("route_master", "delete"), deleteRouteMaster);


export = router;
