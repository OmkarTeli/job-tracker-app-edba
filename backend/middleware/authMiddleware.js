const JWT = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
   try {
      const decode = JWT.verify(
         req.headers.authorization,
         process.env.JWT_SECRET
      );

      req.user = decode;
      next();
   } catch (error) {
      res.status(200).json({
         success: false,
         message: "unauthorized access",
      });
   }
};
module.exports = requireSignIn;
