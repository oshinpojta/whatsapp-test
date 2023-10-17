import * as express from "express";
import {
  // createActivitylog,
  //  getInputForActivity,
   createActivitylogg,
   getAllActivityLog
} from "../controllers/activitylogController";

let router = express.Router();

// router.post("/", createActivitylog);
router.post("/", createActivitylogg);
router.get("/", getAllActivityLog);
// router.get("/getInputForActivity", getInputForActivity);



export = router;
