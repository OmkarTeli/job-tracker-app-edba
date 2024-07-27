const applicationModel = require("../model/applicationModel");

const createApplicationController = async (req, res) => {
   try {
      const userid = req.user.id;
      console.log(userid);

      const applicaion = req.body;

      const newApplication = await applicationModel.create({
         ...applicaion,
         user: userid,
      });

      if (!newApplication) {
         return res.status(400).send({
            success: false,
            message: "require all fields",
         });
      }
      return res.status(201).send({
         success: true,
         message: "Application submitted successfully",
         newApplication,
      });
   } catch (error) {
      return res.status(500).send({
         success: false,
         message: "error in create-application",
         error,
      });
   }
};
const getAllApplicationsController = async (req, res) => {
   try {
      const jobApplications = await applicationModel.find({
         user: req.user.id,
      });
      if (!jobApplications) {
         return res.status(400).send({
            success: false,
            message: "no applications found",
            jobApplications,
         });
      }
      return res.status(400).send({
         success: true,
         message: "applications found",
         jobApplications,
      });
   } catch (error) {
      return res.status(500).send({
         success: false,
         message: "error in get all applications controller",
         error,
      });
   }
};
const getApplicationController = async (req, res) => {
   try {
      const id = req.params.id;
      const jobApplication = await applicationModel.findById(id);
      // console.log(jobApplication);
      console.log(req.user.id);
      if (!jobApplication) {
         return res.status(401).send({
            success: false,
            message: "application not found",
         });
      }
      if (jobApplication.user != req.user.id) {
         return res.status(401).send({
            success: false,
            message: "application not found for this user",
         });
      }

      return res.status(201).send({
         success: true,
         message: "application found",
         jobApplication,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         success: false,
         message: "error in get single application controller",
         error,
      });
   }
};
const updateApplicationController = async (req, res) => {
   try {
      const { id } = req.params;
      const newApplication = req.body;
      const applicaion = await applicationModel.findById(id);
      if (!applicaion) {
         return res.status(401).send({
            success: false,
            message: "application not found with this id",
         });
      }

      if (applicaion.user != req.user.id) {
         return res.status(401).send({
            success: false,
            message: "you are not allowed to update this application",
         });
      }

      const updatedApplication = await applicationModel.findByIdAndUpdate(
         id,
         newApplication,
         {
            new: true,
            runValidators: true,
         }
      );
      return res.status(201).send({
         success: true,
         message: "application updated successfully",
         updatedApplication,
      });
   } catch (error) {
      return res.status(500).send({
         success: false,
         message: "error in update application controller",
         error,
      });
   }
};
const deleteApplicationController = async (req, res) => {
   try {
      const { id } = req.params;
      const applicaion = await applicationModel.findById(id);
      if (!applicaion) {
         return res.status(401).send({
            success: false,
            message: "application not found with this id",
         });
      }

      if (applicaion.user != req.user.id) {
         return res.status(401).send({
            success: false,
            message: "you are not allowed to delete this application",
         });
      }
      await applicationModel.findByIdAndDelete(id);
      return res.status(200).send({
         success: true,
         message: "application deleted successfully",
      });
   } catch (error) {
      return res.status(500).send({
         success: false,
         message: "error in delete application controller",
         error,
      });
   }
};

module.exports = {
   createApplicationController,
   getApplicationController,
   getAllApplicationsController,
   updateApplicationController,
   deleteApplicationController,
};
