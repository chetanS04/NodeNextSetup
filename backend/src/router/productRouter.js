const express = require("express");
const {
  authenticateUser
} = require("../middleware/auth");
const checkRole = require("../middleware/role");

const {
  products,
  getProducts,
  deleteProduct,
  updateProducts,
} = require("../controller/productController");

const productRoutes = express.Router();

productRoutes.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, Authorization"
  );
  next();
});
productRoutes.get("/get-products", authenticateUser, checkRole(["ADMIN", "USER"]), getProducts);
productRoutes.post("/create-products", authenticateUser, checkRole(["ADMIN"]), products);
productRoutes.put("/update-product/:id", authenticateUser, checkRole(["ADMIN"]), updateProducts);
productRoutes.delete("/delete-product/:id", authenticateUser, checkRole(["ADMIN"]), deleteProduct);

module.exports = productRoutes;


