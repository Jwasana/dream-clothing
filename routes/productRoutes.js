import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignin } from "../midlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  updateProductController,
  filterProductsController,
  productCountController,
  productListController,
  searchProductController,
  similarProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";

const router = express.Router();

//routes
//create product
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController,
  (req, res) => {
    res.status(200).send({
      ok: true,
    });
  }
);

//update product
router.put(
  "/update-product/:id",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController,
  (req, res) => {
    res.status(200).send({
      ok: true,
    });
  }
);

//get all products
router.get("/get-product", getProductController);

//get single product
router.get("/single-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", getProductPhotoController);

//delete product
router.delete("/delete-product/:id", deleteProductController);

//products filter
router.post("/products-filter", filterProductsController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", similarProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignin, braintreePaymentController);

export default router;
