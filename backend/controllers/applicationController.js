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
const getApplicationController = async (req, res) => {};
const getAllApplicationsController = async (req, res) => {};
const updateApplicationController = async (req, res) => {
   try {
   } catch (error) {}
};
const deleteApplicationController = async (req, res) => {};

module.exports = {
   createApplicationController,
   getApplicationController,
   getAllApplicationsController,
   updateApplicationController,
   deleteApplicationController,
};
