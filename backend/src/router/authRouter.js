const express = require("express");
const { register,login } = require("../controller/authController");

const authRoutes = express.Router();

authRoutes.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
     "Authorization,Content-Type"

  );
  next();
});
authRoutes.post("/auth/register", register); 
authRoutes.post("/auth/login", login); 

module.exports = authRoutes;
