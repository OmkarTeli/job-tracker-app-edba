const express = require("express");
const {
   createApplicationController,
   getApplicationController,
   getAllApplicationsController,
   updateApplicationController,
   deleteApplicationController,
} = require("../controllers/applicationController");
const requireSignIn = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-application", requireSignIn, createApplicationController);
router.get("/get-application/:id", getApplicationController);
router.get("/get-application", requireSignIn, getAllApplicationsController);
router.patch("/update-application/:id", updateApplicationController);
router.delete("/delete-applicaion/:id", deleteApplicationController);
module.exports = router;
