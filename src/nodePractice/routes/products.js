const express = require("express");
const data = require("../data");
const {
  getProducts,
  addProduct,
  searchProduct,
  findProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const router = express.Router();

// products api
// router.get("/", getProducts);

router.post("/add", addProduct);

router.get("/search", searchProduct);

router.get("/:productId", findProduct);

// router.put("/:id", updateProduct);

// router.delete("/:id", deleteProduct);

router.route("/").get(getProducts);

router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
