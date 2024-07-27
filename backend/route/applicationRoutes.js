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
router.get("/get-application/:id", requireSignIn, getApplicationController);
router.get("/get-application", requireSignIn, getAllApplicationsController);
router.patch(
   "/update-application/:id",
   requireSignIn,
   updateApplicationController
);
router.delete(
   "/delete-application/:id",
   requireSignIn,
   deleteApplicationController
);
module.exports = router;
