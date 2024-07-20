const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const sendResponse = require("../helper/authHelper");
const userRegisterController = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
         return res.status(404).send({
            success: false,
            message: "all fields required",
         });
      }
      // console.log(req.body.password);
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new userModel({ name, email, password: hashedPassword });
      await user.save();

      const token = JWT.sign(
         { email: user.email, id: user._id },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         }
      );
      return res.status(201).send({
         success: true,
         message: "New User Created",
         user,
         token,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).send({
         message: "error in register",
         success: false,
         error,
      });
   }
};

const userLoginController = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(404).send({
            success: false,
            message: "email and password is required",
         });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
         return res.status(404).send({
            success: false,
            message: "email is not registered",
            error,
         });
      }

      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).send({
            success: false,
            message: "Invlid username or password",
         });
      }

      const token = JWT.sign(
         { email: user.email, id: user._id },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         }
      );
      res.status(200).send({
         success: true,
         message: "login successfully",
         user,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: "error in login",
         error,
      });
   }
};

const userUpdateController = async (req, res) => {
   try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
      });
      if (!user) {
         return res.status(404).send({ error: "User not found" });
      }
      res.send(user);
   } catch (error) {
      console.error("Error updating user:", error);
      res.send({ error: error.message });
   }
};

const userDeleteController = async (req, res) => {
   try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      if (!user) {
         return res.status(404).send({ error: "User not found" });
      }
      res.status(200).send({ message: "User deleted successfully" });
   } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send({ error: error.message });
   }
};
const testController = async (req, res) => {
   res.send("protected route");
};

module.exports = {
   userRegisterController,
   userLoginController,
   userUpdateController,
   userDeleteController,
   testController,
};
