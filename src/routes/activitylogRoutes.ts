import * as express from "express";
import {
  // createActivitylog,
  //  getInputForActivity,
   createActivitylogg,
   getAllActivityLog,
   deleteActivity
} from "../controllers/activitylogController";

let router = express.Router();
const authorize = require('../middleware/authorize');

// router.post("/", createActivitylog);
router.post("/", authorize("activity_log", "create"), createActivitylogg);
router.get("/",getAllActivityLog);
router.delete("/:id", authorize("activity_log", "delete"), deleteActivity);
// router.get("/getInputForActivity", getInputForActivity);



export = router;
