const express = require("express");
const authRoutes = require("./authRouter");
const productRoutes = require('./productRouter')

const router = express.Router();

router.use(authRoutes);
router.use(productRoutes);


module.exports = router;
